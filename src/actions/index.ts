import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from 'resend';
import { checkRateLimit, getClientIP } from '../utils/rateLimiter';

const resendApiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.FROM_EMAIL;
const toEmail = import.meta.env.TO_EMAIL;

const resend = new Resend(resendApiKey);

export const server = {
    sendMessage: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100, 'El nombre debe tener menos de 100 caracteres'),
            email: z.string().email('El correo electrónico no es válido'),
            message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000, 'El mensaje debe tener menos de 1000 caracteres'),
            // Campo honeypot - debe estar vacío (acepta null y lo convierte a string vacío)
            website: z.preprocess(
                (val) => val === null || val === undefined ? '' : val,
                z.string().max(0, 'Spam detectado')
            ).optional().default(''),
            // Timestamp de cuando se cargó el formulario
            formTimestamp: z.string().nullable().optional(),
        }),
        handler: async ({ name, email, message, website, formTimestamp }, context) => {
            try {
                // Validación 1: Honeypot - si este campo tiene valor, es un bot
                if (website && website.trim() !== '') {
                    console.warn('Intento de spam detectado: campo honeypot lleno');
                    return {
                        success: false,
                        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
                    };
                }

                // Validación 2: Tiempo mínimo - el formulario debe haberse cargado al menos 3 segundos antes
                if (formTimestamp) {
                    const formLoadTime = parseInt(formTimestamp, 10);
                    const timeSpent = Date.now() - formLoadTime;
                    const MIN_TIME_MS = 3000; // 3 segundos mínimo
                    
                    if (timeSpent < MIN_TIME_MS) {
                        console.warn('Intento de spam detectado: envío demasiado rápido');
                        return {
                            success: false,
                            message: 'Por favor, tómate un momento para completar el formulario.',
                        };
                    }
                }

                // Validación 3: Rate limiting por IP o email
                // Intentar obtener IP del request si está disponible, sino usar email como identificador
                let identifier: string;
                if (context?.request) {
                    identifier = getClientIP(context.request);
                } else {
                    // Fallback: usar email como identificador para rate limiting
                    identifier = `email:${email.toLowerCase()}`;
                }
                
                const rateLimit = checkRateLimit(identifier);
                
                if (!rateLimit.allowed) {
                    const minutesLeft = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
                    console.warn(`Rate limit excedido para: ${identifier}`);
                    return {
                        success: false,
                        message: `Has enviado demasiados mensajes. Por favor, intenta nuevamente en ${minutesLeft} minuto(s).`,
                    };
                }

                // Validación 4: Campos requeridos
                if (!name || !email || !message) {
                    return {
                        success: false,
                        message: 'Por favor, completa todos los campos.',
                    };
                }
                
                const result = await resend.emails.send({
                    from: `Contacto Devstudio <${fromEmail}>`,
                    to: [`${toEmail}`],
                    subject: 'Nuevo contacto desde el sitio web',
                    html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong> ${message}</p>`
                });
                
                if (result.error) {
                    console.error('Error de Resend:', result.error);
                    return {
                        success: false,
                        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
                    };
                }
                
                return {
                    success: true,
                    message: 'Mensaje enviado correctamente',
                };
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
                return {
                    success: false,
                    message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
                };
            }
        },
    }),
};
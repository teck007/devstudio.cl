import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from 'resend';
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
        }),
        handler: async ({ name, email, message }) => {
            try {
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
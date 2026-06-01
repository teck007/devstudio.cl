// Sistema simple de rate limiting en memoria
// Para producción, considera usar Redis o una solución más robusta

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuración: máximo 3 envíos por IP cada 15 minutos
const MAX_REQUESTS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    // Limpiar entradas expiradas periódicamente (cada 1000 verificaciones aproximadamente)
    if (Math.random() < 0.001) {
        for (const [key, value] of rateLimitStore.entries()) {
            if (value.resetTime < now) {
                rateLimitStore.delete(key);
            }
        }
    }

    if (!entry || entry.resetTime < now) {
        // Nueva ventana de tiempo o ventana expirada
        rateLimitStore.set(ip, {
            count: 1,
            resetTime: now + WINDOW_MS,
        });
        return {
            allowed: true,
            remaining: MAX_REQUESTS - 1,
            resetAt: now + WINDOW_MS,
        };
    }

    if (entry.count >= MAX_REQUESTS) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: entry.resetTime,
        };
    }

    // Incrementar contador
    entry.count++;
    rateLimitStore.set(ip, entry);

    return {
        allowed: true,
        remaining: MAX_REQUESTS - entry.count,
        resetAt: entry.resetTime,
    };
}

export function getClientIP(request: Request): string {
    // Intentar obtener la IP real del cliente
    // Esto funciona con proxies reversos comunes
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        const ips = forwarded.split(',');
        return ips[0].trim();
    }
    
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }
    
    // Fallback: usar un identificador basado en headers
    // En producción, esto debería venir del servidor
    return request.headers.get('cf-connecting-ip') || 
           request.headers.get('x-client-ip') || 
           'unknown';
}


const buckets = new Map();

function clientKey(req, scope) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : String(forwardedFor || req.ip || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    return `${scope}:${ip}`;
}

export function rateLimit({ windowMs = 60_000, max = 5, scope = 'global' } = {}) {
    return (req, res, next) => {
        const now = Date.now();
        const key = clientKey(req, scope);
        const current = buckets.get(key) || { count: 0, resetAt: now + windowMs };

        if (now > current.resetAt) {
            current.count = 0;
            current.resetAt = now + windowMs;
        }

        current.count += 1;
        buckets.set(key, current);

        if (current.count > max) {
            const retryAfter = Math.ceil((current.resetAt - now) / 1000);
            res.set('Retry-After', String(retryAfter));
            return res.status(429).json({
                success: false,
                message: `Too many requests. Please try again in ${retryAfter} seconds.`
            });
        }

        next();
    };
}

setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
        if (now > bucket.resetAt) buckets.delete(key);
    }
}, 5 * 60_000).unref?.();

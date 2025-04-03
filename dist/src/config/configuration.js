"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
        mysql: {
            host: process.env.MYSQL_HOST || '127.0.0.1',
            port: parseInt(process.env.MYSQL_PORT || '3306', 10),
            username: process.env.MYSQL_USERNAME || 'root',
            password: process.env.MYSQL_PASSWORD || 'password',
            database: process.env.MYSQL_DATABASE || 'ecommerce',
        },
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce',
        },
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || 'redispass',
        db: parseInt(process.env.REDIS_DB || '0', 10),
        keyPrefix: process.env.REDIS_KEY_PREFIX || 'ecommerce:',
        ttl: parseInt(process.env.REDIS_TTL || '86400', 10),
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
        refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
        bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
    },
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
    },
    swagger: {
        title: 'E-commerce API',
        description: 'E-commerce REST API documentation',
        version: '1.0',
        tag: 'api',
    },
    cors: {
        enabled: process.env.CORS_ENABLED === 'true',
        origins: process.env.CORS_ORIGINS?.split(',') || ['http://127.0.0.1:3000'],
    },
    security: {
        helmet: {
            enabled: process.env.HELMET_ENABLED !== 'false',
        },
        rateLimit: {
            enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
            max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
        },
    },
    cache: {
        ttl: parseInt(process.env.CACHE_TTL || '300', 10),
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    pagination: {
        defaultPage: parseInt(process.env.PAGINATION_DEFAULT_PAGE || '1', 10),
        defaultLimit: parseInt(process.env.PAGINATION_DEFAULT_LIMIT || '10', 10),
        maxLimit: parseInt(process.env.PAGINATION_MAX_LIMIT || '100', 10),
    },
});
//# sourceMappingURL=configuration.js.map
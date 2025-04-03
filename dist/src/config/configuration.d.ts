declare const _default: () => {
    environment: string;
    port: number;
    database: {
        mysql: {
            host: string;
            port: number;
            username: string;
            password: string;
            database: string;
        };
        mongodb: {
            uri: string;
        };
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
        keyPrefix: string;
        ttl: number;
    };
    auth: {
        jwtSecret: string;
        jwtExpiresIn: string;
        refreshTokenExpiresIn: string;
        bcryptSaltRounds: number;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    swagger: {
        title: string;
        description: string;
        version: string;
        tag: string;
    };
    cors: {
        enabled: boolean;
        origins: string[];
    };
    security: {
        helmet: {
            enabled: boolean;
        };
        rateLimit: {
            enabled: boolean;
            windowMs: number;
            max: number;
        };
    };
    cache: {
        ttl: number;
    };
    logging: {
        level: string;
    };
    pagination: {
        defaultPage: number;
        defaultLimit: number;
        maxLimit: number;
    };
};
export default _default;

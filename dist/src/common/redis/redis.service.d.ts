export declare class RedisService {
    private cacheManager;
    private readonly logger;
    private cache;
    constructor(cacheManager: any);
    set(key: string, value: string, ttl?: number): Promise<'OK'>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<number>;
    setJson<T>(key: string, value: T, ttl?: number): Promise<'OK'>;
    getJson<T>(key: string): Promise<T | null>;
    hset(key: string, field: string, value: string): Promise<number>;
    hget(key: string, field: string): Promise<string | null>;
    hgetall(key: string): Promise<Record<string, string>>;
    hdel(key: string, field: string): Promise<number>;
    clearCache(pattern: string): Promise<number>;
    exists(key: string): Promise<boolean>;
    ping(): Promise<string>;
    reset(): Promise<void>;
}

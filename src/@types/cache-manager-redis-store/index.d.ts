declare module 'cache-manager-redis-store' {
  import { RedisClientOptions } from 'redis';
  
  function redisStore(options?: any): any;
  
  export = redisStore;
} 
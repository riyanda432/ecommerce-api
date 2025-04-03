import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Simple in-memory cache for development
class InMemoryCache {
  private cache = new Map<string, any>();

  get(key: string) {
    return Promise.resolve(this.cache.get(key));
  }

  set(key: string, value: any, ttl?: number) {
    this.cache.set(key, value);
    if (ttl) {
      setTimeout(() => this.cache.delete(key), ttl * 1000);
    }
    return Promise.resolve();
  }

  del(key: string) {
    this.cache.delete(key);
    return Promise.resolve();
  }

  reset() {
    this.cache.clear();
    return Promise.resolve();
  }
}

import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CACHE_MANAGER',
      useFactory: () => new InMemoryCache(),
    },
    RedisService,
  ],
  exports: ['CACHE_MANAGER', RedisService],
})
export class RedisModule {} 
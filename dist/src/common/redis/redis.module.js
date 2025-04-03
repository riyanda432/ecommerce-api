"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
class InMemoryCache {
    constructor() {
        this.cache = new Map();
    }
    get(key) {
        return Promise.resolve(this.cache.get(key));
    }
    set(key, value, ttl) {
        this.cache.set(key, value);
        if (ttl) {
            setTimeout(() => this.cache.delete(key), ttl * 1000);
        }
        return Promise.resolve();
    }
    del(key) {
        this.cache.delete(key);
        return Promise.resolve();
    }
    reset() {
        this.cache.clear();
        return Promise.resolve();
    }
}
const redis_service_1 = require("./redis.service");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: 'CACHE_MANAGER',
                useFactory: () => new InMemoryCache(),
            },
            redis_service_1.RedisService,
        ],
        exports: ['CACHE_MANAGER', redis_service_1.RedisService],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map
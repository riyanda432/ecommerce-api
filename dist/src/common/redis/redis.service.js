"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let RedisService = RedisService_1 = class RedisService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new common_2.Logger(RedisService_1.name);
        this.cache = new Map();
    }
    async set(key, value, ttl) {
        try {
            this.cache.set(key, value);
            if (ttl) {
                setTimeout(() => this.cache.delete(key), ttl * 1000);
            }
            return 'OK';
        }
        catch (error) {
            this.logger.error(`Error setting cache key ${key}: ${error.message}`);
            throw error;
        }
    }
    async get(key) {
        try {
            return this.cache.get(key) || null;
        }
        catch (error) {
            this.logger.error(`Error getting cache key ${key}: ${error.message}`);
            throw error;
        }
    }
    async delete(key) {
        try {
            const deleted = this.cache.delete(key);
            return deleted ? 1 : 0;
        }
        catch (error) {
            this.logger.error(`Error deleting cache key ${key}: ${error.message}`);
            throw error;
        }
    }
    async setJson(key, value, ttl) {
        try {
            return await this.set(key, JSON.stringify(value), ttl);
        }
        catch (error) {
            this.logger.error(`Error setting JSON cache key ${key}: ${error.message}`);
            throw error;
        }
    }
    async getJson(key) {
        try {
            const data = await this.get(key);
            if (!data)
                return null;
            return JSON.parse(data);
        }
        catch (error) {
            this.logger.error(`Error getting JSON cache key ${key}: ${error.message}`);
            throw error;
        }
    }
    async hset(key, field, value) {
        const hashKey = `${key}:${field}`;
        await this.set(hashKey, value);
        return 1;
    }
    async hget(key, field) {
        const hashKey = `${key}:${field}`;
        return this.get(hashKey);
    }
    async hgetall(key) {
        this.logger.log(`HGETALL operation (stubbed) for key: ${key}`);
        return {};
    }
    async hdel(key, field) {
        const hashKey = `${key}:${field}`;
        return this.delete(hashKey);
    }
    async clearCache(pattern) {
        this.logger.log(`Cache clearing with pattern ${pattern} called (stubbed)`);
        this.cache.clear();
        return 1;
    }
    async exists(key) {
        return this.cache.has(key);
    }
    async ping() {
        return 'PONG';
    }
    async reset() {
        this.cache.clear();
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CACHE_MANAGER')),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map
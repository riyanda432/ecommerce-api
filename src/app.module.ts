import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
// import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from './common/redis/redis.module';
import configuration from './config/configuration';
import { dataSourceOptions } from './database/data-source';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
// import { CategoriesModule } from './modules/categories/categories.module';
// import { OrdersModule } from './modules/orders/orders.module';
// import { CartModule } from './modules/cart/cart.module';
// import { PromotionsModule } from './modules/promotions/promotions.module';
// import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    
    // MySQL Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => dataSourceOptions,
      inject: [ConfigService],
    }),
    
    // Redis Cache
    RedisModule,
    
    // Feature modules
    UsersModule,
    AuthModule,
    ProductsModule,
    // CategoriesModule,
    // OrdersModule,
    // CartModule,
    // PromotionsModule,
    // AdminModule,
  ],
})
export class AppModule {}

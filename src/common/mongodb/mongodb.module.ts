import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// MongoDB imports are commented out to fix build errors
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserActivitySchema } from './schemas/user-activity.schema';
// import { AnalyticsSchema } from './schemas/analytics.schema';
// import { OrderAnalyticsSchema } from './schemas/order-analytics.schema';
// import { CancellationAnalyticsSchema } from './schemas/cancellation-analytics.schema';
// import { ProductReviewsSchema } from './schemas/product-reviews.schema';

@Module({
  imports: [
    ConfigModule,
    /* Comment out MongoDB module
    MongooseModule.forFeature([
      { name: 'UserActivity', schema: UserActivitySchema },
      { name: 'Analytics', schema: AnalyticsSchema },
      { name: 'OrderAnalytics', schema: OrderAnalyticsSchema },
      { name: 'CancellationAnalytics', schema: CancellationAnalyticsSchema },
      { name: 'ProductReviews', schema: ProductReviewsSchema },
    ]),
    */
  ],
  // Keep exports and providers if needed
})
export class MongodbModule {} 
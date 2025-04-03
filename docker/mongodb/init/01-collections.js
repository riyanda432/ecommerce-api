// MongoDB Initialization Script
db = db.getSiblingDB('ecommerce');

// Product Catalog Collection
db.createCollection('productCatalog');
db.productCatalog.createIndex({ productId: 1 }, { unique: true });
db.productCatalog.createIndex({ "name": "text", "description": "text" });
db.productCatalog.createIndex({ "metadata.tags": 1 });

// User Session & Activity Collection
db.createCollection('userActivity');
db.userActivity.createIndex({ userId: 1 });
db.userActivity.createIndex({ sessionId: 1 });
db.userActivity.createIndex({ "sessionStart": 1 });
db.userActivity.createIndex({ "viewed_products.product_id": 1 });
db.userActivity.createIndex({ "events.type": 1, "events.timestamp": 1 });

// Cart Sync Collection
db.createCollection('cartSync');
db.cartSync.createIndex({ cartId: 1 }, { unique: true });
db.cartSync.createIndex({ userId: 1 });
db.cartSync.createIndex({ sessionId: 1 });
db.cartSync.createIndex({ abandoned: 1, lastActivity: 1 });
db.cartSync.createIndex({ "items.productId": 1 });

// Analytics Collection
db.createCollection('analytics');
db.analytics.createIndex({ timestamp: 1 });
db.analytics.createIndex({ event_type: 1 });
db.analytics.createIndex({ userId: 1 });
db.analytics.createIndex({ "data.product_id": 1 });
db.analytics.createIndex({ "data.category_id": 1 });

// Order Analytics Collection
db.createCollection('orderAnalytics');
db.orderAnalytics.createIndex({ orderId: 1 }, { unique: true });
db.orderAnalytics.createIndex({ userId: 1 });
db.orderAnalytics.createIndex({ status: 1 });
db.orderAnalytics.createIndex({ created_at: 1 });
db.orderAnalytics.createIndex({ "items.productId": 1 });

// Cancellation Analytics Collection
db.createCollection('cancellationAnalytics');
db.cancellationAnalytics.createIndex({ orderId: 1 });
db.cancellationAnalytics.createIndex({ cancellationId: 1 });
db.cancellationAnalytics.createIndex({ reason: 1 });
db.cancellationAnalytics.createIndex({ created_at: 1 });

// Product Reviews Collection
db.createCollection('productReviews');
db.productReviews.createIndex({ productId: 1 });
db.productReviews.createIndex({ userId: 1 });
db.productReviews.createIndex({ rating: 1 });
db.productReviews.createIndex({ created_at: 1 });

// Time-To-Live Indexes for User Sessions
db.userActivity.createIndex({ lastActivity: 1 }, { expireAfterSeconds: 2592000 }); // 30 days

// Create admin user for MongoDB access
db.createUser({
  user: 'ecommerceuser',
  pwd: 'ecommercepass',
  roles: [
    { role: 'readWrite', db: 'ecommerce' }
  ]
}); 
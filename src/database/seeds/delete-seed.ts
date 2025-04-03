import { DataSource } from 'typeorm';
import dataSource from '../data-source';

async function deleteSeed() {
  // Initialize the data source
  const connection = await dataSource.initialize();
  console.log('Database connection initialized for deletion');

  try {
    // Delete in reverse order of dependencies to respect foreign key constraints
    
    // 1. Delete payments and order-related data first
    console.log('Deleting payments...');
    await connection.query('DELETE FROM payments');
    
    console.log('Deleting order_status_history...');
    await connection.query('DELETE FROM order_status_history');
    
    console.log('Deleting order_items...');
    await connection.query('DELETE FROM order_items');
    
    console.log('Deleting orders...');
    await connection.query('DELETE FROM orders');
    
    // 2. Delete cart data
    console.log('Deleting cart_items...');
    await connection.query('DELETE FROM cart_items');
    
    console.log('Deleting carts...');
    await connection.query('DELETE FROM carts');
    
    // 3. Delete vouchers
    console.log('Deleting vouchers...');
    await connection.query('DELETE FROM vouchers');
    
    // 4. Delete product relationships
    console.log('Deleting product_variants...');
    await connection.query('DELETE FROM product_variants');
    
    console.log('Deleting product_categories...');
    await connection.query('DELETE FROM product_categories');
    
    // 5. Delete products
    console.log('Deleting products...');
    await connection.query('DELETE FROM products');
    
    // 6. Delete user addresses
    console.log('Deleting user_addresses...');
    await connection.query('DELETE FROM user_addresses');
    
    // 7. Delete users
    console.log('Deleting users...');
    await connection.query('DELETE FROM users');
    
    // 8. Delete categories (starting with child categories)
    console.log('Deleting categories...');
    await connection.query('DELETE FROM categories WHERE parent_id IS NOT NULL');
    await connection.query('DELETE FROM categories WHERE parent_id IS NULL');

    console.log('All seed data deleted successfully');
  } catch (error) {
    console.error('Error deleting seed data:', error);
  } finally {
    // Close connection
    await connection.destroy();
    console.log('Database connection closed');
  }
}

// Run the delete function
deleteSeed()
  .then(() => {
    console.log('Database cleanup completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }); 
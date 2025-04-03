"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
async function deleteSeed() {
    const connection = await data_source_1.default.initialize();
    console.log('Database connection initialized for deletion');
    try {
        console.log('Deleting payments...');
        await connection.query('DELETE FROM payments');
        console.log('Deleting order_status_history...');
        await connection.query('DELETE FROM order_status_history');
        console.log('Deleting order_items...');
        await connection.query('DELETE FROM order_items');
        console.log('Deleting orders...');
        await connection.query('DELETE FROM orders');
        console.log('Deleting cart_items...');
        await connection.query('DELETE FROM cart_items');
        console.log('Deleting carts...');
        await connection.query('DELETE FROM carts');
        console.log('Deleting vouchers...');
        await connection.query('DELETE FROM vouchers');
        console.log('Deleting product_variants...');
        await connection.query('DELETE FROM product_variants');
        console.log('Deleting product_categories...');
        await connection.query('DELETE FROM product_categories');
        console.log('Deleting products...');
        await connection.query('DELETE FROM products');
        console.log('Deleting user_addresses...');
        await connection.query('DELETE FROM user_addresses');
        console.log('Deleting users...');
        await connection.query('DELETE FROM users');
        console.log('Deleting categories...');
        await connection.query('DELETE FROM categories WHERE parent_id IS NOT NULL');
        await connection.query('DELETE FROM categories WHERE parent_id IS NULL');
        console.log('All seed data deleted successfully');
    }
    catch (error) {
        console.error('Error deleting seed data:', error);
    }
    finally {
        await connection.destroy();
        console.log('Database connection closed');
    }
}
deleteSeed()
    .then(() => {
    console.log('Database cleanup completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('Error cleaning database:', error);
    process.exit(1);
});
//# sourceMappingURL=delete-seed.js.map
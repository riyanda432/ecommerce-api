"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const product_entity_1 = require("../../modules/products/entities/product.entity");
const data_source_1 = require("../data-source");
async function seed() {
    const connection = await data_source_1.default.initialize();
    console.log('Database connection initialized');
    try {
        const userRepository = connection.getRepository(user_entity_1.User);
        const adminPassword = await bcrypt.hash('admin123', 10);
        const userPassword = await bcrypt.hash('user123', 10);
        const existingAdmin = await userRepository.findOne({ where: { email: 'admin@example.com' } });
        const existingUser = await userRepository.findOne({ where: { email: 'user@example.com' } });
        const existingSecondUser = await userRepository.findOne({ where: { email: 'jane@example.com' } });
        const usersToCreate = [];
        if (!existingAdmin) {
            usersToCreate.push(userRepository.create({
                email: 'admin@example.com',
                firstName: 'Admin',
                lastName: 'User',
                password: adminPassword,
                role: 'admin',
                isEmailVerified: true,
            }));
        }
        if (!existingUser) {
            usersToCreate.push(userRepository.create({
                email: 'user@example.com',
                firstName: 'Regular',
                lastName: 'User',
                password: userPassword,
                role: 'user',
                isEmailVerified: true,
            }));
        }
        if (!existingSecondUser) {
            usersToCreate.push(userRepository.create({
                email: 'jane@example.com',
                firstName: 'Jane',
                lastName: 'Smith',
                password: await bcrypt.hash('password123', 10),
                role: 'user',
                isEmailVerified: true,
            }));
        }
        let createdUsers = [];
        if (usersToCreate.length > 0) {
            createdUsers = await userRepository.save(usersToCreate);
            console.log(`${createdUsers.length} new users seeded successfully`);
        }
        else {
            console.log('No new users to seed, skipping...');
            createdUsers = await userRepository.find({
                where: [
                    { email: 'admin@example.com' },
                    { email: 'user@example.com' },
                    { email: 'jane@example.com' }
                ]
            });
        }
        await connection.query(`
      INSERT INTO categories (name, description, is_active) 
      VALUES 
        ('Electronics', 'Electronic devices and accessories', true),
        ('Clothing', 'Apparel and fashion items', true),
        ('Home & Kitchen', 'Home goods and kitchen appliances', true),
        ('Books', 'Books and reading materials', true)
      ON DUPLICATE KEY UPDATE name = VALUES(name);
    `);
        await connection.query(`
      INSERT INTO categories (name, parent_id, description, is_active) 
      SELECT 'Smartphones', id, 'Smartphone devices', true FROM categories WHERE name = 'Electronics' LIMIT 1;
    `);
        await connection.query(`
      INSERT INTO categories (name, parent_id, description, is_active) 
      SELECT 'Laptops', id, 'Laptop computers', true FROM categories WHERE name = 'Electronics' LIMIT 1;
    `);
        await connection.query(`
      INSERT INTO categories (name, parent_id, description, is_active) 
      SELECT 'Audio', id, 'Audio equipment', true FROM categories WHERE name = 'Electronics' LIMIT 1;
    `);
        console.log('Categories seeded successfully');
        const categoryResults = await connection.query(`
      SELECT id, name FROM categories ORDER BY id LIMIT 10;
    `);
        const categoryMap = categoryResults.reduce((map, cat) => {
            map[cat.name] = cat.id;
            return map;
        }, {});
        for (const user of createdUsers) {
            const existingAddresses = await connection.query(`
        SELECT * FROM user_addresses WHERE user_id = ?
      `, [user.id]);
            if (existingAddresses.length === 0) {
                await connection.query(`
          INSERT INTO user_addresses (user_id, address_line1, address_line2, city, state, postal_code, country, is_default) 
          VALUES 
            (?, '123 Main St', 'Apt 4B', 'New York', 'NY', '10001', 'USA', true)
        `, [user.id]);
                if (user.role !== 'admin') {
                    await connection.query(`
            INSERT INTO user_addresses (user_id, address_line1, city, state, postal_code, country, is_default) 
            VALUES 
              (?, '456 Oak Avenue', 'Los Angeles', 'CA', '90001', 'USA', false)
          `, [user.id]);
                }
                console.log(`Addresses created for user ${user.id}`);
            }
            else {
                console.log(`Addresses already exist for user ${user.id}, skipping...`);
            }
        }
        console.log('User addresses seeded successfully');
        const productRepository = connection.getRepository(product_entity_1.Product);
        const products = [
            {
                name: 'Smartphone X',
                description: 'Latest smartphone with amazing features',
                price: 999.99,
                stock: 50,
                sku: 'PHONE-X-128',
                isActive: true,
                mainImage: 'https://example.com/images/smartphone-x.jpg',
                images: [
                    'https://example.com/images/smartphone-x-1.jpg',
                    'https://example.com/images/smartphone-x-2.jpg',
                ],
                categoryId: categoryMap['Smartphones'] || null
            },
            {
                name: 'Laptop Pro',
                description: 'High-performance laptop for professionals',
                price: 1499.99,
                stock: 30,
                sku: 'LAPTOP-PRO-16',
                isActive: true,
                mainImage: 'https://example.com/images/laptop-pro.jpg',
                images: [
                    'https://example.com/images/laptop-pro-1.jpg',
                    'https://example.com/images/laptop-pro-2.jpg',
                ],
                categoryId: categoryMap['Laptops'] || null
            },
            {
                name: 'Wireless Earbuds',
                description: 'Premium sound quality wireless earbuds',
                price: 149.99,
                stock: 100,
                sku: 'AUDIO-EB-BLK',
                isActive: true,
                mainImage: 'https://example.com/images/earbuds.jpg',
                images: [
                    'https://example.com/images/earbuds-1.jpg',
                    'https://example.com/images/earbuds-2.jpg',
                ],
                categoryId: categoryMap['Audio'] || null
            },
            {
                name: 'Smart Watch',
                description: 'Feature-rich smartwatch with health tracking',
                price: 299.99,
                stock: 45,
                sku: 'WATCH-SM-BLK',
                isActive: true,
                mainImage: 'https://example.com/images/smartwatch.jpg',
                images: [
                    'https://example.com/images/smartwatch-1.jpg',
                    'https://example.com/images/smartwatch-2.jpg',
                ],
                categoryId: categoryMap['Electronics'] || null
            },
            {
                name: 'Bluetooth Speaker',
                description: 'Portable Bluetooth speaker with deep bass',
                price: 79.99,
                stock: 60,
                sku: 'AUDIO-SP-RED',
                isActive: true,
                mainImage: 'https://example.com/images/speaker.jpg',
                images: [
                    'https://example.com/images/speaker-1.jpg',
                    'https://example.com/images/speaker-2.jpg',
                ],
                categoryId: categoryMap['Audio'] || null
            }
        ];
        const existingProducts = await productRepository.find({
            where: products.map(p => ({ sku: p.sku }))
        });
        const existingSkus = existingProducts.map(p => p.sku);
        const productsToCreate = products.filter(p => !existingSkus.includes(p.sku));
        let createdProducts = [];
        if (productsToCreate.length > 0) {
            const newProducts = productsToCreate.map(product => productRepository.create(product));
            const savedProducts = await productRepository.save(newProducts);
            createdProducts = [...existingProducts, ...savedProducts];
            console.log(`${savedProducts.length} new products seeded successfully`);
        }
        else {
            createdProducts = existingProducts;
            console.log('No new products to seed, skipping...');
        }
        for (const product of createdProducts) {
            const existingVariants = await connection.query(`
        SELECT * FROM product_variants WHERE product_id = ?
      `, [product.id]);
            if (existingVariants.length === 0) {
                if (product.name === 'Smartphone X') {
                    await connection.query(`
            INSERT INTO product_variants (product_id, sku, attributes, price_adjustment, stock_quantity, is_active)
            VALUES
              (?, 'PHONE-X-128-BLK', '{"color": "Black", "storage": "128GB"}', 0, 30, true),
              (?, 'PHONE-X-256-BLK', '{"color": "Black", "storage": "256GB"}', 100, 15, true),
              (?, 'PHONE-X-128-WHT', '{"color": "White", "storage": "128GB"}', 0, 25, true),
              (?, 'PHONE-X-256-WHT', '{"color": "White", "storage": "256GB"}', 100, 10, true)
          `, [product.id, product.id, product.id, product.id]);
                    console.log(`Variants created for product ${product.id}`);
                }
                else if (product.name === 'Laptop Pro') {
                    await connection.query(`
            INSERT INTO product_variants (product_id, sku, attributes, price_adjustment, stock_quantity, is_active)
            VALUES
              (?, 'LAPTOP-PRO-16-8GB', '{"ram": "8GB", "storage": "512GB SSD"}', 0, 20, true),
              (?, 'LAPTOP-PRO-16-16GB', '{"ram": "16GB", "storage": "512GB SSD"}', 200, 15, true),
              (?, 'LAPTOP-PRO-16-32GB', '{"ram": "32GB", "storage": "1TB SSD"}', 500, 10, true)
          `, [product.id, product.id, product.id]);
                    console.log(`Variants created for product ${product.id}`);
                }
            }
            else {
                console.log(`Variants already exist for product ${product.id}, skipping...`);
            }
        }
        console.log('Product variants seeded successfully');
        await connection.query(`
      INSERT IGNORE INTO product_categories (product_id, category_id)
      SELECT p.id, c.id 
      FROM products p, categories c 
      WHERE p.name = 'Smartphone X' AND c.name = 'Smartphones';
    `);
        await connection.query(`
      INSERT IGNORE INTO product_categories (product_id, category_id)
      SELECT p.id, c.id 
      FROM products p, categories c 
      WHERE p.name = 'Laptop Pro' AND c.name = 'Laptops';
    `);
        await connection.query(`
      INSERT IGNORE INTO product_categories (product_id, category_id)
      SELECT p.id, c.id 
      FROM products p, categories c 
      WHERE p.name = 'Wireless Earbuds' AND c.name = 'Audio';
    `);
        console.log('Product-category associations seeded successfully');
        for (const user of createdUsers) {
            if (user.role === 'user') {
                const existingCart = await connection.query(`
          SELECT * FROM carts WHERE user_id = ? LIMIT 1
        `, [user.id]);
                if (existingCart.length === 0) {
                    const cartResults = await connection.query(`
            INSERT INTO carts (user_id, session_id) VALUES (?, UUID())
          `, [user.id]);
                    if (createdProducts.length >= 2) {
                        const randomProduct1 = createdProducts[0];
                        const randomProduct2 = createdProducts[1];
                        await connection.query(`
              INSERT INTO cart_items (cart_id, product_id, quantity)
              VALUES (LAST_INSERT_ID(), ?, 1), (LAST_INSERT_ID(), ?, 2)
            `, [randomProduct1.id, randomProduct2.id]);
                    }
                    console.log(`Cart created for user ${user.id}`);
                }
                else {
                    console.log(`Cart already exists for user ${user.id}, skipping...`);
                }
            }
        }
        console.log('Carts seeded successfully');
        await connection.query(`
      INSERT IGNORE INTO vouchers (code, type, value, min_purchase_amount, starts_at, expires_at, max_uses, current_uses, is_active)
      VALUES
        ('WELCOME10', 'percentage', 10, 50, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 100, 0, true),
        ('SUMMER20', 'percentage', 20, 100, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), 50, 0, true),
        ('FREESHIP', 'fixed_amount', 15, 75, NOW(), DATE_ADD(NOW(), INTERVAL 15 DAY), 30, 0, true)
    `);
        console.log('Vouchers seeded successfully');
        const userWithRole = createdUsers.find(u => u.role === 'user');
        if (userWithRole) {
            const userAddresses = await connection.query(`
        SELECT id FROM user_addresses WHERE user_id = ? LIMIT 2
      `, [userWithRole.id]);
            if (userAddresses.length >= 2 && createdProducts.length >= 2) {
                const existingOrders = await connection.query(`
          SELECT * FROM orders WHERE user_id = ? LIMIT 1
        `, [userWithRole.id]);
                if (existingOrders.length === 0) {
                    const order1Result = await connection.query(`
            INSERT INTO orders (user_id, status, total_amount, shipping_address_id, billing_address_id, created_at)
            VALUES (?, 'delivered', 1149.98, ?, ?, DATE_SUB(NOW(), INTERVAL 10 DAY))
          `, [userWithRole.id, userAddresses[0].id, userAddresses[0].id]);
                    const order1Id = order1Result.insertId;
                    await connection.query(`
            INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
            VALUES 
              (?, ?, 1, 999.99, 999.99),
              (?, ?, 1, 149.99, 149.99)
          `, [order1Id, createdProducts[0].id, order1Id, createdProducts[2].id]);
                    await connection.query(`
            INSERT INTO order_status_history (order_id, status, notes, created_at)
            VALUES
              (?, 'pending', 'Order placed', DATE_SUB(NOW(), INTERVAL 10 DAY)),
              (?, 'processing', 'Payment confirmed', DATE_SUB(NOW(), INTERVAL 9 DAY)),
              (?, 'shipped', 'Order shipped via Express Delivery', DATE_SUB(NOW(), INTERVAL 7 DAY)),
              (?, 'delivered', 'Order delivered', DATE_SUB(NOW(), INTERVAL 5 DAY))
          `, [order1Id, order1Id, order1Id, order1Id]);
                    await connection.query(`
            INSERT INTO payments (order_id, amount, status, payment_method, transaction_id, payment_details)
            VALUES (?, 1149.98, 'completed', 'credit_card', 'TXN-12345', '{"card_last4": "4242", "card_brand": "visa"}')
          `, [order1Id]);
                    if (userAddresses.length >= 2 && createdProducts.length >= 3) {
                        const order2Result = await connection.query(`
              INSERT INTO orders (user_id, status, total_amount, shipping_address_id, billing_address_id, created_at)
              VALUES (?, 'processing', 1579.98, ?, ?, DATE_SUB(NOW(), INTERVAL 2 DAY))
            `, [userWithRole.id, userAddresses[1].id, userAddresses[1].id]);
                        const order2Id = order2Result.insertId;
                        await connection.query(`
              INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
              VALUES 
                (?, ?, 1, 1499.99, 1499.99),
                (?, ?, 1, 79.99, 79.99)
            `, [order2Id, createdProducts[1].id, order2Id, createdProducts[4].id]);
                        await connection.query(`
              INSERT INTO order_status_history (order_id, status, notes, created_at)
              VALUES
                (?, 'pending', 'Order placed', DATE_SUB(NOW(), INTERVAL 2 DAY)),
                (?, 'processing', 'Payment confirmed', DATE_SUB(NOW(), INTERVAL 1 DAY))
            `, [order2Id, order2Id]);
                        await connection.query(`
              INSERT INTO payments (order_id, amount, status, payment_method, transaction_id, payment_details)
              VALUES (?, 1579.98, 'completed', 'paypal', 'PP-67890', '{"email": "user@example.com"}')
            `, [order2Id]);
                    }
                    console.log('Orders created for user');
                }
                else {
                    console.log('Orders already exist for user, skipping...');
                }
            }
        }
        console.log('Orders seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        await connection.destroy();
        console.log('Database connection closed');
    }
}
seed()
    .then(() => {
    console.log('Database seeding completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map
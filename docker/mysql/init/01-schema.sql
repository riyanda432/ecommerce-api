-- MySQL Database Initialization
-- Grant permissions to root for remote connections
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_addresses (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- Admin Management
CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'manager', 'support') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS admin_permissions (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  admin_id BIGINT UNSIGNED NOT NULL,
  permission VARCHAR(100) NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admins(id),
  UNIQUE KEY unique_admin_permission (admin_id, permission),
  INDEX idx_admin_id (admin_id)
) ENGINE=InnoDB;

-- Category Management
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  parent_id BIGINT UNSIGNED,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

-- Product Management
CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  base_price DECIMAL(15,2) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_sku (sku),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_categories (
  product_id BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_variants (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  attributes JSON NOT NULL,
  price_adjustment DECIMAL(15,2) DEFAULT 0,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_product_id (product_id),
  INDEX idx_sku (sku)
) ENGINE=InnoDB;

-- Cart Management
CREATE TABLE IF NOT EXISTS carts (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED,
  session_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_session_id (session_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  cart_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  variant_id BIGINT UNSIGNED,
  quantity INT UNSIGNED NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  UNIQUE KEY unique_cart_product (cart_id, product_id, variant_id),
  INDEX idx_cart_id (cart_id)
) ENGINE=InnoDB;

-- Custom Pricing
CREATE TABLE IF NOT EXISTS price_rules (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('discount_percentage', 'discount_amount', 'fixed_price', 'bulk_pricing') NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  priority INT NOT NULL DEFAULT 0,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active_date (is_active, starts_at, ends_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_price_rules (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  variant_id BIGINT UNSIGNED,
  price_rule_id BIGINT UNSIGNED NOT NULL,
  min_quantity INT UNSIGNED DEFAULT 1,
  max_quantity INT UNSIGNED,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  FOREIGN KEY (price_rule_id) REFERENCES price_rules(id),
  INDEX idx_product_variant (product_id, variant_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_group_prices (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  variant_id BIGINT UNSIGNED,
  user_group ENUM('regular', 'premium', 'wholesale', 'vip') NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  UNIQUE KEY unique_product_group (product_id, variant_id, user_group)
) ENGINE=InnoDB;

-- Vouchers
CREATE TABLE IF NOT EXISTS vouchers (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  type ENUM('percentage', 'fixed_amount') NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  min_purchase_amount DECIMAL(15,2) DEFAULT 0,
  starts_at TIMESTAMP NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  max_uses INT UNSIGNED,
  current_uses INT UNSIGNED DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_is_active (is_active),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB;

-- Order Management
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(15,2) NOT NULL,
  shipping_address_id BIGINT UNSIGNED NOT NULL,
  billing_address_id BIGINT UNSIGNED NOT NULL,
  voucher_id BIGINT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_address_id) REFERENCES user_addresses(id),
  FOREIGN KEY (billing_address_id) REFERENCES user_addresses(id),
  FOREIGN KEY (voucher_id) REFERENCES vouchers(id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  variant_id BIGINT UNSIGNED,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(15,2) NOT NULL,
  total_price DECIMAL(15,2) NOT NULL, 
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (variant_id) REFERENCES product_variants(id),
  INDEX idx_product_variant (product_id, variant_id),
  INDEX idx_product_quantity (product_id, quantity),
  INDEX idx_order_quantity (order_id, quantity)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_status_history (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') NOT NULL,
  notes TEXT,
  created_by BIGINT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_order_id (order_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cancellations (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  reason ENUM('customer_request', 'payment_failed', 'fraud_detected', 'inventory_issue', 'other') NOT NULL,
  description TEXT,
  requested_by BIGINT UNSIGNED,
  refund_status ENUM('pending', 'processed', 'rejected') DEFAULT 'pending',
  refund_amount DECIMAL(15,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_order_id (order_id)
) ENGINE=InnoDB;

-- Payment Management
CREATE TABLE IF NOT EXISTS payments (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'crypto') NOT NULL,
  transaction_id VARCHAR(255),
  payment_details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_order_id (order_id),
  INDEX idx_status (status),
  INDEX idx_transaction_id (transaction_id)
) ENGINE=InnoDB;

-- Transaction Log for Audit
CREATE TABLE IF NOT EXISTS transaction_logs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  payment_id BIGINT UNSIGNED,
  order_id BIGINT UNSIGNED,
  user_id BIGINT UNSIGNED,
  type ENUM('payment', 'refund', 'chargeback', 'adjustment') NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  status ENUM('success', 'failed', 'pending') NOT NULL,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_payment_id (payment_id),
  INDEX idx_order_id (order_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Insert default admin user
INSERT INTO admins (email, password_hash, role) 
VALUES ('admin@example.com', '$2b$10$NJFZJJDhuxK2mtVxw4R3FeQavU1QGwmrmpbQhJOf/Lr9LdAHgHgI.', 'super_admin')
ON DUPLICATE KEY UPDATE email = email; -- Password: admin123 
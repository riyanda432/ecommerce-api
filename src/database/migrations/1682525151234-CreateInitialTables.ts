import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1682525151234 implements MigrationInterface {
  name = 'CreateInitialTables1682525151234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        \`first_name\` varchar(255) NOT NULL,
        \`last_name\` varchar(255) NOT NULL,
        \`password\` varchar(255) NOT NULL,
        \`is_email_verified\` tinyint NOT NULL DEFAULT 0,
        \`phone_number\` varchar(255) NULL,
        \`profile_picture\` varchar(255) NULL,
        \`role\` varchar(255) NOT NULL DEFAULT 'user',
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add unique constraint on email
    await queryRunner.query(`
      ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_users_email\` (\`email\`)
    `);

    // Create products table
    await queryRunner.query(`
      CREATE TABLE \`products\` (
        \`id\` varchar(36) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`description\` text NULL,
        \`price\` decimal(10,2) NOT NULL,
        \`stock\` int NOT NULL DEFAULT 0,
        \`sku\` varchar(255) NULL,
        \`is_active\` tinyint NOT NULL DEFAULT 1,
        \`images\` text NULL,
        \`main_image\` varchar(255) NULL,
        \`category_id\` varchar(36) NULL,
        \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    // Add index on category_id for faster lookups
    await queryRunner.query(`
      CREATE INDEX \`IDX_products_category_id\` ON \`products\` (\`category_id\`)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop products table
    await queryRunner.query(`DROP INDEX \`IDX_products_category_id\` ON \`products\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    
    // Drop users table
    await queryRunner.query(`DROP INDEX \`IDX_users_email\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
} 
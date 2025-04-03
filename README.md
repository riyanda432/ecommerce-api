# E-commerce API

A robust e-commerce REST API built with NestJS, TypeORM, MySQL, MongoDB, and Redis.

## Overview

This project is a feature-rich e-commerce API that provides essential e-commerce functionality including user authentication, product management, shopping cart operations, order processing, and more. It implements modern software design patterns and follows best practices for API development.

## Technologies Used

- **NestJS** - Progressive Node.js framework for building efficient and scalable server-side applications
- **TypeORM** - ORM for TypeScript and JavaScript
- **MySQL** - Primary relational database
- **MongoDB** - NoSQL database for specific features
- **Redis** - In-memory data structure store for caching and session management
- **JWT** - JSON Web Tokens for authentication
- **Swagger** - API documentation
- **Docker** - Containerization
- **Helmet** - Security by setting HTTP headers
- **Class Validator/Transformer** - Request validation and transformation

## Features

- **User Management**
  - Registration and authentication
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Profile management

- **Product Management**
  - CRUD operations for products
  - Product search and filtering
  - Stock management

- **Advanced Features**
  - Caching with Redis
  - Rate limiting
  - Error handling with global exception filters
  - Database migrations
  - Data seeding

## Project Structure

The project follows a modular architecture using NestJS's module system:

```
.
├── src/
│   ├── modules/            # Feature modules
│   │   ├── users/          # User management
│   │   ├── auth/           # Authentication
│   │   ├── products/       # Product management
│   │   └── ...
│   ├── common/             # Shared code
│   │   ├── filters/        # Exception filters
│   │   ├── redis/          # Redis service
│   │   └── ...
│   ├── config/             # Configuration
│   ├── database/           # Database related code
│   │   ├── migrations/     # TypeORM migrations
│   │   └── seeds/          # Database seeders
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── docker/                 # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker build instructions
├── .env                    # Environment variables
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MySQL (v8.x or later)
- Redis (v6.x or later)
- MongoDB (optional, v4.x or later)
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-api.git
   cd ecommerce-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and update the values according to your setup.

### Database Setup

#### Using Docker (Recommended)

Start the required services using Docker Compose:

```bash
docker-compose up -d
```

This will start MySQL, Redis, and MongoDB instances.

#### Manual Setup

If you prefer to set up databases manually, ensure you have MySQL, Redis, and MongoDB running on your system, and update the `.env` file with the correct connection details.

### Database Migrations

Run migrations to create database tables:

```bash
npm run migration:run
```

### Seed the Database

Populate the database with initial data:

```bash
npm run seed
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

The API will be available at: `http://localhost:3000/api`
Swagger documentation will be available at: `http://localhost:3000/api/docs`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products

- `GET /api/products` - Get all products
- `GET /api/products?category=:categoryId` - Get products by category
- `GET /api/products?search=:query` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (requires authentication)
- `PATCH /api/products/:id` - Update product (requires authentication)
- `DELETE /api/products/:id` - Delete product (requires authentication)
- `PATCH /api/products/:id/stock` - Update product stock (requires authentication)

## Environment Variables

The application uses the following environment variables, which can be set in the `.env` file:

```
# Application
NODE_ENV=development
PORT=3000

# MySQL Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=ecommerce

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ecommerce

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_TTL=3600

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=1d

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10
```

## Security

The API implements various security measures:

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Helmet for secure HTTP headers
- Rate limiting to prevent abuse
- Input validation
- Error filtering to prevent sensitive information leakage

## Development

### Creating a New Migration

```bash
npm run migration:generate -- -n MigrationName
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Database Seeding

This project includes scripts to easily seed and clean your development database.

### Seeding the Database

To populate your database with test data, run:

```bash
npm run seed
```

This will create:
- Test users (admin and regular users)
- Categories and subcategories
- Products with variants
- User addresses
- Carts with items
- Vouchers
- Sample orders with status history

The seed script uses the `ON DUPLICATE KEY` feature to avoid creating duplicate entries when run multiple times.

### Cleaning the Database

To remove all seeded data from your database, run:

```bash
npm run seed:delete
```

This will delete all records from the database tables in the correct order to respect foreign key constraints.

### Full Reset

For a complete reset of your database, you can run:

```bash
npm run seed:delete && npm run seed
```

This will clean the database and then repopulate it with fresh seed data.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run start:dev

# Build the application
npm run build

# Run in production mode
npm run start:prod
``` 
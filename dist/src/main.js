"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port');
    const environment = configService.get('environment');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(), new http_exception_filter_1.HttpExceptionFilter());
    app.use((0, helmet_1.default)());
    app.enableCors();
    if (environment !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('E-commerce API')
            .setDescription(`
## E-commerce API Documentation

This is the API documentation for the E-commerce platform. Below you'll find all available endpoints and how to use them.

### Authentication

The API uses JWT (JSON Web Token) Bearer authentication. 

To authenticate:
1. Register a new user with POST /api/auth/register
2. Login with POST /api/auth/login
3. Use the received token in the Authorization header for protected endpoints:
   \`\`\`
   Authorization: Bearer YOUR_JWT_TOKEN
   \`\`\`

### Role-Based Access Control

Some endpoints require specific user roles:
- **Admin Role**: Full access to all endpoints
- **User Role**: Limited access to user-specific endpoints

Endpoints that require authentication are marked with a lock icon 🔒.
Endpoints that require admin role will be marked in their description.

### Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Server Error
      `)
            .setVersion('1.0')
            .addTag('auth', 'Authentication endpoints')
            .addTag('users', 'User management endpoints')
            .addTag('products', 'Product management endpoints')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Enter your JWT token',
            in: 'header'
        }, 'access-token')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                docExpansion: 'none',
                filter: true,
                showExtensions: true,
                showCommonExtensions: true,
                defaultModelsExpandDepth: 1,
            },
            customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css',
        });
    }
    app.setGlobalPrefix('api');
    await app.listen(port);
    console.log(`Application is running on: http://127.0.0.1:${port}`);
    console.log(`Swagger is available at: http://127.0.0.1:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
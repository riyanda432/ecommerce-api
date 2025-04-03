import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const environment = configService.get<string>('environment');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filters
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  // Security
  app.use(helmet());
  app.enableCors();

  // Swagger API documentation
  if (environment !== 'production') {
    const config = new DocumentBuilder()
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
      .addBearerAuth(
        { 
          type: 'http', 
          scheme: 'bearer', 
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter your JWT token',
          in: 'header'
        },
        'access-token'
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
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

  // Global prefix
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Application is running on: http://127.0.0.1:${port}`);
  console.log(`Swagger is available at: http://127.0.0.1:${port}/api/docs`);
}
bootstrap();

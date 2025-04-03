import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = 
      exception instanceof HttpException 
        ? exception.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // If this is a HttpException, we can get the response
    let errorResponse = exception instanceof HttpException 
      ? exception.getResponse() 
      : { message: exception.message || 'Internal server error' };

    // Format the error response
    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(typeof errorResponse === 'string'
        ? { message: errorResponse }
        : errorResponse),
    };

    // Only expose detailed error info in development
    if (process.env.NODE_ENV !== 'production' && exception.stack) {
      error['stack'] = exception.stack;
    }

    // Log error details
    this.logger.error(
      `Exception: ${status} - ${exception.message || 'Internal server error'}`,
      exception.stack,
    );

    response.status(status).json(error);
  }
} 
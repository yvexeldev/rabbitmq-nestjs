import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: any = {};

    // Check if exception is an instance of HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object') {
        message = (responseBody as any).message || message;
        errorDetails = responseBody;
      }
    } else if (typeof exception == 'string') {
      message = exception;
    } else {
      // Handle non-HTTP exceptions
      message = exception.message || message;
      errorDetails = {
        name: exception.name,
        stack: exception.stack,
        message: exception.message,
      };
    }

    // Log the error details
    this.logger.error(
      `Error occurred on ${request.method} ${request.url}, ${JSON.stringify(
        {
          status,
          message,
          errorDetails,
        },
        null,
        2,
      )}`,
    );

    // Send a detailed error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      errorDetails,
    });
  }
}

import { appendFileSync } from 'node:fs';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    
    const message = exception.message;
    const timestamp = new Date().toISOString();

    appendFileSync('errors.log', `[${timestamp}] ${status} - ${exception.message}\n`);

    response
      .status(status)
      .json({
        statusCode: status,
        message,
        timestamp,
      })
  }
}

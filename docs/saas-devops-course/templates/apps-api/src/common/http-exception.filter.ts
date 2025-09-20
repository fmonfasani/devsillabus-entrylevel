import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error', code: 'INTERNAL_ERROR' };

    response.status(status).send({
      statusCode: status,
      error: typeof message === 'string' ? message : (message as Record<string, unknown>),
      timestamp: new Date().toISOString(),
    });
  }
}

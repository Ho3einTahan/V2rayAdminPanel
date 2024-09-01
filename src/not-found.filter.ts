import { ExceptionFilter, Catch, NotFoundException, HttpStatus, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.NOT_FOUND;

        response.status(status).render('404');

    }

}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

//custom error
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost){
    console.log(exception.getResponse())
    console.log(exception.getStatus())

    const context = host.switchToHttp();

    const request = context.getRequest<Request>()
    const response = context.getResponse<Response>()

    response.send({
      status: exception.getStatus(),
      message: exception.getResponse()
    })
  }
}
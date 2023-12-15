import {Controller, Get, Req, Res, Inject, Post, Body} from '@nestjs/common';
import {Request, Response} from "express";
import {PaymentsService} from "../../services/payments/payments.service";
import {PaymentDto} from "../dto/payment.dto";

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('PAYMENT_SERVICE') private readonly paymentsService: PaymentsService){}
    @Get()
    getPayments( @Req() request: Request, @Res() response: Response){
      const {count, page}= request.query
        if(!count || !page){
            response.status(400).send({msg: 'Error parameter'})
        }
        else{
            response.send(200)
        }
    }

    @Post('create')
    async createPayment(@Body() dto: PaymentDto){
      try{
        const response = await this.paymentsService.createPayment(dto)
        return response;
      }catch (err){
        return err;
      }

    }
}

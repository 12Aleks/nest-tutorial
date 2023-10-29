import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Req,
    Res,
    UsePipes, ValidationPipe
} from '@nestjs/common';
import {Request, Response} from "express";
import {CustomersService} from "../../services/customers/customers.service";
import {CreateCustomerDto} from "../../dto/createCustomer.dto";

@Controller('customers')
export class CustomersController {
    constructor(private customersServices: CustomersService) {}
    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
        @Res() res: Response
        ){
       let customer =  this.customersServices.findCustomerById(id);
       if(customer){
           res.send(customer)
       }else{
           res.status(400).send({mes: 'Customer not found!'})
       }
    }

    @Get('/search/:id')
    searchCustomerById(
        @Param('id', ParseIntPipe) id: number
    ){
          const customer = this.customersServices.findCustomerById(id)
          if(customer) return customer
          else throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST)
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() dto: CreateCustomerDto){
        return this.customersServices.createCustomer(dto)
    }

    @Get()
    findAll(){
        return this.customersServices.getAll()
    }

}

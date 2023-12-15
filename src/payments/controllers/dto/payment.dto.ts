import {IsEmail, IsNotEmpty, IsNumber} from "class-validator";

export class PaymentDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsNumber()
    price: number
}
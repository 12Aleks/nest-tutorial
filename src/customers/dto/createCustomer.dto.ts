import {IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumberString, ValidateNested} from "class-validator";
import {AddressDto} from "./createAddress.dto";
import {Type} from "class-transformer";


export class CreateCustomerDto{
    @IsNumberString()
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    // @IsDate()
    createAt: Date;

    //vlozenyj
    // @ValidateNested()
    // @Type(() => AddressDto)
    // @IsNotEmptyObject()
    // address: AddressDto
}
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @MinLength(2)
    username: string;

    @IsNotEmpty()
    @MinLength(10)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
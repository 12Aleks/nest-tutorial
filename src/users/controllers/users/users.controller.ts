import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param, ParseIntPipe, Post, UseFilters, UseGuards,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {SerializedUser} from "../../types";
import {UserNotFoundException} from "../../exceptions/UserNotFound.exception";
import {HttpExceptionFilter} from "../../filters/HttpException.filter";
import {CreateUserDto} from "../../dto/CreateUser.dto";
import {AuthenticatedGuard} from "../../../auth/utils/LocalGuards";

@Controller('users')
export class UsersController {

    constructor(@Inject("USER_SERVICE") private readonly userService: UsersService) {
    }

    @Get('')
    getAllUsers() {
        return this.userService.getUsers()
    }


    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('username/:username')
    getByUserName(@Param('username') username: string) {
        const user = this.userService.getUserByUserName(username);

        //new class has been created and password has been removed
        if (user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }


    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.getUserById(id);
        if (user) return new SerializedUser(user);
        else {
            throw new UserNotFoundException();
        }

    }

    @Post('create')
    @UsePipes(ValidationPipe) // Check fields in dto with class-validator
    createUser(@Body() dto: CreateUserDto){
       return this.userService.createUser(dto)
    }
}

import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "../../service/users/users.service";
import {SerializedUser} from "../../types";

@Controller('users')
export class UsersController {

    constructor(@Inject("USER_SERVICE") private readonly userService: UsersService ) {}
    @Get('')
    getAllUsers(){
      return this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':username')
    getByUserName(@Param('username') username: string){
        const user =  this.userService.getUserByUserName(username);
        if(user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
}

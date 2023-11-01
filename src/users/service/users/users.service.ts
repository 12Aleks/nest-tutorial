import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Index, SerializedUser} from "../../types";
import {plainToClass} from "class-transformer";

@Injectable()
export class UsersService {
    private users: Index[] = [
        {
            username: 'Tomas',
            password: '12345'
        },
        {
            username: 'Bob',
            password: '3312345'
        },
        {
            username: 'Jin',
            password: '22345'
        }
    ]

    getUsers(){
        //plainToClass - password removed in replies
        return this.users.map(user => plainToClass(SerializedUser, user))
    }

   getUserByUserName(username:string ){
       return this.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
    }

}

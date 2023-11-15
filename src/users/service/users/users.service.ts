import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUser, SerializedUser} from "../../types";
import {plainToClass} from "class-transformer";

@Injectable()
export class UsersService {
    private users: IUser[] = [
        {
            id: 1,
            username: 'Tomas',
            password: '12345'
        },
        {
            id: 2,
            username: 'Bob',
            password: '3312345'
        },
        {
            id: 3,
            username: 'Jin',
            password: '22345'
        },
        {
           id: 4,
            username: 'samantha',
            password: '2345'
        }
    ]

    getUsers(){
        //plainToClass - password removed in replies
        return this.users.map(user => plainToClass(SerializedUser, user))
    }

   getUserByUserName(username:string ){
       return this.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
    }

    getUserById(id: number){
        return this.users.find((user) => user.id === id)
    }

}

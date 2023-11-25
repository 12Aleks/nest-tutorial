import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUser, SerializedUser} from "../../types";
import {plainToClass} from "class-transformer";
import {CreateUserDto} from "../../dto/CreateUser.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User as UserEntity} from "../../../typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity> ) {}

    private users: IUser[] = []

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

    async createUser(dto: CreateUserDto){
      const check = await this.userRepository.findOneBy({email: dto.email})
      console.log(check)
      if(check) throw new HttpException('This email address is already in the database', HttpStatus.BAD_REQUEST)
      const newUser =  this.userRepository.create(dto);
      return this.userRepository.save(newUser)

    }

    findUserByUsername(username: string){
        return this.userRepository.findOneBy({username})
    }


}

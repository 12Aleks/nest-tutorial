import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUser, SerializedUser} from "../../types";
import {plainToClass} from "class-transformer";
import {CreateUserDto} from "../../dto/CreateUser.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User as UserEntity} from "../../../typeorm";
import {Repository} from "typeorm";
import {encodePassword} from "../../../utils/bcrypt";

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
      const check = await this.userRepository.findOneBy({email: dto.email});
      if(check) throw new HttpException('This email address is already in the database', HttpStatus.BAD_REQUEST);

      const password: string = encodePassword(dto.password)

      const newUser =  this.userRepository.create({...dto, password});
      return this.userRepository.save(newUser)

    }

    findUserByUsername(username: string){
        return this.userRepository.findOneBy({username})
    }

    findUserById(id: number){
       return this.userRepository.findOneBy({id})
    }


}

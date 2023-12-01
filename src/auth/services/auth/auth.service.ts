import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../../users/services/users/users.service";
import {User} from "../../../typeorm";
import {comparePassword} from "../../../utils/bcrypt";
import {UserNotFoundException} from "../../../users/exceptions/UserNotFound.exception";

@Injectable()
export class AuthService {
    constructor(@Inject("USER_SERVICE") private readonly userService: UsersService ) {}
    async validateUser(username: string, password: string): Promise<User | null>{
      const userDB: User = await this.userService.findUserByUsername(username);
      if(userDB){
          const matched = comparePassword(password, userDB.password);

          if(matched){
              return userDB
          }else{
             throw new UnauthorizedException('Wrong password');
          }

      }

      return null
    }

}

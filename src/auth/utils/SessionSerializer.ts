import {PassportSerializer} from "@nestjs/passport";
import {Inject} from "@nestjs/common";
import {UsersService} from "../../users/services/users/users.service";
import {User} from "../../typeorm";

export class SessionSerializer extends PassportSerializer{
   constructor(@Inject("USER_SERVICE") private readonly userServices: UsersService ) {
       super();
   }

   serializeUser(user: User, done: (err, user: User) => void): any {
      console.log('Serialize')
      done(null, user)
   }

   async deserializeUser(user: User, done: (err, user: User) => void){
      console.log('Deserialize')
      const userDB = await this.userServices.findUserById(user.id)
      return userDB ? done(null, user): done(null, null)
   }
}
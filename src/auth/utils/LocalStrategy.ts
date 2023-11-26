import {Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy } from 'passport-local';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
   constructor(@Inject("AUTH_SERVICE") private readonly authService: AuthService ){
       super({
           usernameField: 'email'
       })
   }

    async validate(email: string, password: string){
     const userData = await this.authService.validateUser(email, password);
     if(!userData) throw new UnauthorizedException('User not found or password is incorrect')

     return userData

   }
}
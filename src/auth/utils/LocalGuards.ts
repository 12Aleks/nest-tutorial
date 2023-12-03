import {AuthGuard} from "@nestjs/passport";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Request} from "express";

@Injectable()
export class LocalAuthGuards extends AuthGuard('local'){
   async canActivate(context: ExecutionContext){
          const result = (await super.canActivate(context)) as boolean;
          const request = context.switchToHttp().getRequest();
          await super.logIn(request);
          return result
   }
}


export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<any>{
         const req = context.switchToHttp().getRequest<Request>()
         return req.isAuthenticated()
    }
}
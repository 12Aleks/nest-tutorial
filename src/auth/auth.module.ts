import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth/auth.controller';
import {AuthService} from './services/auth/auth.service';
import {UsersService} from "../users/services/users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        },
        {
            provide: 'USER_SERVICE',
            useClass: UsersService
        }
    ]
})
export class AuthModule {
}

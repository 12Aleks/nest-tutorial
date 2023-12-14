import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import {TypeormStore} from "connect-typeorm";
import { DataSource } from 'typeorm';
import {SessionEntity} from "./typeorm";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const sessionRepository =  app.get(DataSource).getRepository(SessionEntity);
    app.setGlobalPrefix('api');
    app.use(
        session({
            name: 'Session',
            resave: false,
            saveUninitialized: false,
            cookie: {
              maxAge: Number(process.env.COOKIE_MAX_AGE)
                // maxAge: 60000
            },
            store: new TypeormStore().connect(sessionRepository),
            secret:  process.env.SESSION_KEY,
        })
    );

    //passport has been added here to connect with the session
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}

bootstrap();

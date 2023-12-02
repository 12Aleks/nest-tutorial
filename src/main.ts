import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(
        session({
            name: 'Session',
            secret:  process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
              maxAge: 60000
            }
        })
    );
    await app.listen(3000);
}

bootstrap();

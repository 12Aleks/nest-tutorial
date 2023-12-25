import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import * as session from "express-session";
import {TypeormStore} from "connect-typeorm";
import * as passport from "passport";
import {DataSource} from "typeorm";
import {SessionEntity} from "../src/typeorm";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

      app = moduleFixture.createNestApplication();
      app.setGlobalPrefix('api');
      const sessionRepository =  app.get(DataSource).getRepository(SessionEntity);

      //sessions
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
      await app.init();
    });

    describe('Authentication', () => {
        const URL = '/api/auth/login';

        it('should login', () => {
            return request(app.getHttpServer()).post(URL).send({
                username: 'Bob',
                password: '12345678910'
            }).expect(201)
                .end((err, res) => {
                  res.headers('')
                  console.log(res.headers)
                })
        });

        it('should visit /api/users and return 200', () => {
           return request(app.getHttpServer()).get('/api/users').expect(200)
        })
    })

    // it('/ (GET)', () => {
    //   return request(app.getHttpServer())
    //     .get('/')
    //     .expect(200)
    //     .expect('Hello World!');
    // });
});

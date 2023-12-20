import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('UsersController E2E test', () => {
  let app: INestApplication;

  beforeAll(async () => {
      const moduleFixture: TestingModule =  await Test.createTestingModule({
          imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
  })

   it('should create a new user', () => {
       return request(app.getHttpServer())
           .post('/api/users/create').send({
               username: 'Tom',
               password: '123',
               email: 'test@gmail.com'
           })
   })
})
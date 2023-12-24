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
      app.setGlobalPrefix('api');
      await app.init();
  })


    describe('Creating new Users POST /api/users/create', () => {
        const CREATE_USER_URL = '/api/users/create';

        it('should create a new user', async () => {
            const response = await request(app.getHttpServer())
                .post(CREATE_USER_URL).send({
                    username: 'Tom',
                    password: '123456789101112',
                    email: 'best1Test@gmail.com'
                }).expect(201)

            return response
        })

        it('should return a 400 when invalid username is provided', () => {
            return request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .send({
                    username: 'an',
                    password: '123456789012',
                    email: 'testnyr@email.com'
                }).expect(400)
        })

        it('should return a 400 when invalid password is provided', () => {
            return request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .send({
                    username: 'Jim',
                    password: '123456',
                    email: 'testnyruuu@email.com'
                }).expect(400)
        })

        it('should return a 400 when invalid email is provided', () => {
            return request(app.getHttpServer())
                .post(CREATE_USER_URL)
                .send({
                    username: 'Jim',
                    password: '123456789456',
                    email: 'testnyruuu'
                }).expect(400)
        })
    })


})
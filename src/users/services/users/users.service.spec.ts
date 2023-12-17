import { Test, TestingModule } from '@nestjs/testing';
import {UsersService} from "./users.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {User} from "../../../typeorm";
import {Repository} from "typeorm";
import * as bcryptUtils from '../../../utils/bcrypt'

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>



  const USER_REPOSITORY_TOKEN = getRepositoryToken(User)



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: USER_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          findOneBy: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined()
  })

  describe('createUser', () => {
    it('should create a new user with encoded password', async () => {
       //watch to the method encodePassword
      jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValueOnce('hashed123')

       await service.createUser({
         username: 'Tom',
         email: 'test@gmail.com',
         password: '123456'
       })
    })
  })
});


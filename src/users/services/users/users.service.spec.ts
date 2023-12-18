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
    it('should encode password correctly', async () => {
       //watch to the method encodePassword
      jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123456')

       await service.createUser({
         username: 'Tom',
         email: 'test@gmail.com',
         password: '123456'
       })

      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123456')
    })

    it('should call userRepository.create with correct params', async() => {
      await service.createUser({
        username: 'Tom',
        email: 'test@gmail.com',
        password: '123456'
      })

      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'Tom',
        email: 'test@gmail.com',
        password: 'hashed123456'
      })

      expect(userRepository.create).toReturnWith({

      })
    })


    it('should call userRepository.create with correct params', async() => {

      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        username: 'Tom',
        email: 'test@gmail.com',
        password: 'hashed123456',
        scype: ''
      });

      await service.createUser({
        username: 'Tom',
        email: 'test@gmail.com',
        password: 'hashed123456'
      })

      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        username: 'Tom',
        email: 'test@gmail.com',
        password: 'hashed123456',
        scype: ''
      })

    })
  })
});


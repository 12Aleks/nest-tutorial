import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import {Request, Response} from "express";
import {PaymentsService} from "../../services/payments/payments.service";
import {BadRequestException} from "@nestjs/common";

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  //models for the test
  const requestModel = {
    query: {

    }
  } as unknown as Request;

  const statusResponseMock  = {
    send: jest.fn((x) => x)
  }

  const responseModel = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x)
  } as unknown as Response;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{
        provide: 'PAYMENT_SERVICE',
        useValue: {
          createPayment: jest.fn((x) => x)
        }
      }]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENT_SERVICE')
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //opredelena li payment service
  it('payments service should be defined', () => {
    expect(paymentsService).toBeDefined();
  })

  //test
  describe('getPayments', () => {
    it('return status 400', async () => {
      await controller.getPayments(requestModel, responseModel)
      expect(responseModel.status).toHaveBeenCalledWith(400)
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Error parameter'
      })
    })

    it('Status 200', async () => {
      requestModel.query = {
        count: '10',
        page: '1'
      }
      await controller.getPayments(requestModel, responseModel)
      expect(responseModel.send).toHaveBeenCalledWith(200)
    })
  })

  describe('createPayment', () => {
    it('should return an error', async () => {
      //nabludenie za payment service
      jest.spyOn(paymentsService, 'createPayment').mockImplementation(() => {
        throw new BadRequestException()
      })
      try{
        const response = await controller.createPayment({
          email: "test1@gmail.com",
          price: 100
        })
      }catch(err){
        console.log(err)
      }

    })
    // it('should return a successful response', async () => {
    //   const response = await controller.createPayment({
    //     email: "test1@gmail.com",
    //     price: 100
    //   })
    //
    //   expect(response).toStrictEqual({status: 'success'})
    // })
  })
});

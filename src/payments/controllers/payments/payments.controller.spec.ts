import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import {Request, Response} from "express";

describe('PaymentsController', () => {
  let controller: PaymentsController;

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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //test
  describe('getPayments', () => {
    it('return status 400', () => {
      controller.getPayments(requestModel, responseModel)
      expect(responseModel.status).toHaveBeenCalledWith(400)
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Error parameter'
      })
    })

    it('Status 200', () => {
      requestModel.query = {
        count: '10',
        page: '1'
      }
      controller.getPayments(requestModel, responseModel)
      expect(responseModel.send).toHaveBeenCalledWith(200)
    })
  })
});

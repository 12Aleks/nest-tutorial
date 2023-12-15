import {BadRequestException, Injectable} from '@nestjs/common';
import {PaymentDto} from "../../controllers/dto/payment.dto";

@Injectable()
export class PaymentsService {

    private user = [
        {
            email: 'test1@gmail.com'
        }, {
            email: 'test2@gmail.com'
        }, {
            email: 'test3@gmail.com'
        }, {
            email: 'test4@gmail.com'
        }, {
            email: 'test5@gmail.com'
        },
    ]

    async createPayment(dto: PaymentDto){
        const {email} = dto;

        const user = this.user.find(user => user.email === email)
        if(user) {
            return{
                id: 1,
                status: 'Success!'
            }
        }else{
            throw new BadRequestException()
        }

    }
}

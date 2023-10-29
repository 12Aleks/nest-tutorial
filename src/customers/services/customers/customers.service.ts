import { Injectable } from '@nestjs/common';
import {CreateCustomerDto} from "../../dto/createCustomer.dto";

@Injectable()
export class CustomersService {

     users = [
        {
            id: 1,
            name: 'Bob',
            email: 'test1@gmail.com',
            createAt: new Date()
        },
        {
            id: 2,
            name: 'Jim',
            email: 'test2@gmail.com',
            createAt: new Date()
        },
        {
            id: 3,
            name: 'John',
            email: 'test3@gmail.com',
            createAt: new Date()
        }
    ]

    findCustomerById(id: number){
       return this.users.find((user) => user.id === id)
    }


    createCustomer(customerDto: CreateCustomerDto){
       this.users.push(customerDto)
    }

    getAll(){
         return this.users
    }

}

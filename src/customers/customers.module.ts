import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CustomersController} from './controllers/customers/customers.controller';
import {CustomersService} from './services/customers/customers.service';
import {ValidateCustomerMiddleware} from "./middlewares/validate_customer.middleware";
import {ValidateCustomerAccountMiddleware} from "./middlewares/validate_customer_account.middleware";

@Module({
    controllers: [CustomersController],
    providers: [CustomersService]
})
export class CustomersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware).exclude(
            {
                path: '/create',
                method: RequestMethod.POST
            }
        ).forRoutes(CustomersController)

        //add paths
        // consumer.apply(ValidateCustomerMiddleware).forRoutes(
        //     {
        //         path: 'customers/search/:id',
        //         method: RequestMethod.GET
        //     },
        //     {
        //         path: 'customers/:id',
        //         method: RequestMethod.GET
        //     }
        // )
    }
}

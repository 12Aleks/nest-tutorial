import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [
      CustomersModule,
      UsersModule,
      TypeOrmModule.forRoot({
        type: "mysql",
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'user123',
        database: 'nest_db',
        entities: [],
        synchronize: true
      })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

//mysq -u root -p
//create database db_name;
//create user 'username'@'localhost' identified by 'password'
//GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON database_name.* TO 'user'@'localhost';
//or
//grant all privileges on *.* to 'username'@'localhost';
//or
//grant all privileges on `database_name`.`table_name` to 'user_name'@'hostname';
// - hostname can be IP address, localhost, 127.0.0.1
// - In database_name/table_name, * means all databases
// - In hostname, to specify all hosts use '%'
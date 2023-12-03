import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import entities from "./typeorm";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      //npm i --save @nestjs/config - instead of dotenv
      CustomersModule,
      UsersModule,
      TypeOrmModule.forRoot({
        type: "mysql",
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [...entities],
        synchronize: true
      }),
      AuthModule,
      PassportModule.register({
          //passport has been connected with the session
          session: true
      })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

//install npm i @nestjs/typeorm typeorm mysql2

//mysql -u root -p
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
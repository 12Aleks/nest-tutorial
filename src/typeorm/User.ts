import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn({
      type: 'bigint'
  })
    id: number
}
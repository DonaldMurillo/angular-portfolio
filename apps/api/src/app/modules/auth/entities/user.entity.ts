import { Entity, Column } from "typeorm";
import { BaseEntity } from '../../../shared/entities/base.entity';

@Entity()
export class User extends BaseEntity {

  @Column({
    nullable: false,
    unique: true,
    update: false
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  //failed attemps
  //last failed attempt
  //last login
  //reset password status
  //reset password last request
}

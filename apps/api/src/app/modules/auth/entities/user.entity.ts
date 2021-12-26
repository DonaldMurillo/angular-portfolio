import { Entity, Column } from "typeorm";
import { BaseEntity } from '../../../shared/entities/base.entity';
@Entity()
export class User extends BaseEntity  {

    @Column()
    username: string;

	  @Column()
    email: string;

    @Column()
    password: string;

    //failed attemps
    //last failed attempt
    //last login
    //reset password status
    //reset password last request
}

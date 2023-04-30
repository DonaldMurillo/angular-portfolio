import { Entity, Column, BeforeInsert } from "typeorm";
import { BaseEntity } from '../../../shared/entities/base.entity';
import * as bcrypt from 'bcrypt';
import { UserType } from '../../../shared/enums/auth.enum';

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
		default: UserType.user
	})
	userType: string;

	@Column({
		nullable: false,
	})
	password: string;

	@BeforeInsert()
	async setPassword(password: string) {
		const salt = await bcrypt.genSalt()
		this.password = await bcrypt.hash(password || this.password, salt)
	}


	//failed attemps
	//last failed attempt
	//last login
	//reset password status
	//reset password last request
}


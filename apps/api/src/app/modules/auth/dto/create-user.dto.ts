import { IsEmail, IsNotEmpty } from 'class-validator';
import { CredentialsDto } from './credentials.dto';

export class CreateUserDto extends CredentialsDto {

	@IsEmail()
	@IsNotEmpty()
	email: string;

}

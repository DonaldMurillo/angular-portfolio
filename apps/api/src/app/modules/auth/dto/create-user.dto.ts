import { IsEmail, IsNotEmpty } from 'class-validator';
import { CredentialsDto } from './credentials.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends CredentialsDto {

  @ApiProperty({
    required: true,
    format: 'email'
  })
	@IsEmail()
	@IsNotEmpty()
	email: string;

}

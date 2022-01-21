import { IsEmail, IsNotEmpty } from 'class-validator';
import { CredentialsDto } from './credentials.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../../shared/enums/auth.enum';

export class CreateUserDto extends CredentialsDto {

  @ApiProperty({
    required: true,
    format: 'email',
    uniqueItems: true
  })
	@IsEmail()
	@IsNotEmpty()
	email: string;

  @ApiProperty({
    required: true,
    enum: UserType,
    default: UserType.user
  })
  //should not be mandatory as empty will set default value
  //had userType cannot be empty on front
	userType: UserType;

}

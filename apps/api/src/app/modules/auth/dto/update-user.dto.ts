import { Equals, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto {

  @ApiProperty({
    required: true,
    format: 'password',
    example: 'Pass#Word1'

  })
	@IsNotEmpty()
	oldPassword: string;

  @ApiProperty({
    required: true,
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$',
    minLength: 8,
    maxLength: 30,
    example: 'Pass#Word0'

  })
	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})
	newPassword: string;

  @ApiProperty({
    required: true,
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$',
    minLength: 8,
    maxLength: 30,
    example: 'Pass#Word0'

  })
	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})
	repeatNewPassword: string;

}


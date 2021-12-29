import { IsAlphanumeric, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {

  @ApiProperty({
    description: 'is alphanumeric',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 20
  })
	@IsAlphanumeric()
	@Length(4,20)
	username: string;

  @ApiProperty({
    required: true,
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$',
    minLength: 8,
    maxLength: 30,
    example: 'Pass#Word0'
  })
	@Length(8,30)
	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})

  @ApiProperty()
	password: string;

}

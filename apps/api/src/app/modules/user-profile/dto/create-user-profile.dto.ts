import { IsAlphanumeric, IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProfileDto {
  @ApiProperty({
    description: 'is alphanumeric',
    required: true,
    format: 'string',
    minLength: 4,
    maxLength: 20
  })
	@IsNotEmpty()
	@IsAlphanumeric()
	@Length(4, 20)
	nickname: string

	//@IsOptional()
	//avatarImage: Buffer

  @ApiProperty({
    description: 'Allows trades to be published globaly',
    required: false,
    format: 'boolean'

  })
	@IsOptional()
	@IsBoolean()
	showTrades: boolean

  @ApiProperty({
    description: 'Set theme to be applied on user profile',
    required: false,
    format: 'string'

  })
	@IsOptional()
	@IsString()
	theme: string


}

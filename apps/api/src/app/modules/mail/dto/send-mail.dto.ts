import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendMailDto {

  @ApiProperty({
    required: true,
    format: 'email'
  })
	@IsEmail()
	receiver: string;

  @ApiProperty({
    required: true,
    type: 'string'
  })
  subject: string;

  @ApiPropertyOptional({
    required: false,
    isArray: true
  })
	arrayVar: string[];


}

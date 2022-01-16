import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCollectionDto  {

  @ApiProperty({
    required: true
  })
	@IsNotEmpty()
	name: string;

  @ApiProperty({
    required: true,
    type: 'boolean'
  })
	@IsNotEmpty()
  @IsBoolean()
	tradeable: boolean;

}

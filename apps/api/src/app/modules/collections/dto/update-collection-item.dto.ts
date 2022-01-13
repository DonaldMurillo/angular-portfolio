import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';


export class UpdateCollectionItemDto {
	@ApiProperty({
    required: true,
    minimum: 0
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number

  @ApiProperty({
    required: true,
    format: 'uuid'
  })
  collection: string;
}

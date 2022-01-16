
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCollectionItemDto } from './create-collection-item.dto';

export class CreateCollectionDto {

  @ApiProperty({
    required: true
  })
	@IsNotEmpty()
	name: string;

  @ApiProperty({
    required: true,
    format: 'uuid'
  })
  @IsNotEmpty()
  @IsUUID()
	profileId: string;

  @ApiProperty({
    required: true,
    default: false
  })
  @IsNotEmpty()
  @IsBoolean()
  tradeable: boolean;

  @ApiProperty({
    required: false,
    type: [CreateCollectionItemDto]
  })
  items: CreateCollectionItemDto[];
}

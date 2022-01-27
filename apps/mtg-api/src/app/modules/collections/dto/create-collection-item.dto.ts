import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Collection } from '../entities/collection.entity';

export class CreateCollectionItemDto {
  @ApiProperty({
    required: true,
    type: 'uuid',
  })
  @IsNotEmpty()
  @IsUUID()
  scryfallId: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    format: 'url',
  })
  @IsNotEmpty()
  @IsUrl()
  scryfallUri: string;

  @ApiProperty({
    required: true,
    format: 'url',
  })
  @IsNotEmpty()
  @IsUrl()
  imageUriNormal: string;

  @ApiProperty({
    nullable: true,
    isArray: true,
    ///
  })
  @IsArray()
  colors: string[];

  @ApiProperty({
    required: true,
    type: 'boolean',
  })
  @IsNotEmpty()
  @IsBoolean()
  foil: boolean;

  @ApiProperty({
    required: true,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({
    required: false,
  })
  lang: string;
}

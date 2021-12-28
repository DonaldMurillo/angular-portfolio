import { CreateUserProfileDto } from './create-user-profile.dto';
import { IsAlphanumeric, IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserProfileDto {

  @IsNotEmpty()
	@IsAlphanumeric()
	@Length(4, 20)
	nickname: string

  //@Column({
  //  nullable: true,
  //  type: 'bytea'
  //})
  //avatarImage: Buffer

  @IsOptional()
	@IsBoolean()
	showTrades: boolean

	@IsOptional()
	@IsString()
	theme: string

}

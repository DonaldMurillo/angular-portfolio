import { IsAlphanumeric, IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';


export class CreateUserProfileDto {

	@IsNotEmpty()
	@IsAlphanumeric()
	@Length(4, 20)
	nickname: string

	//@IsOptional()
	//avatarImage: Buffer

	@IsOptional()
	@IsBoolean()
	showTrades: boolean

	@IsOptional()
	@IsString()
	theme: string


}

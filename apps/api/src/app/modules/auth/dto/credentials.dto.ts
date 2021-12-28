
import { IsAlphanumeric, Length, Matches } from 'class-validator';

export class CredentialsDto {

	@IsAlphanumeric()
	@Length(4,20)
	username: string;

	@Length(8,30)
	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})
	password: string;

}

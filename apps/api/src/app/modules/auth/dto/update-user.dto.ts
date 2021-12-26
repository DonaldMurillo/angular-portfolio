import { Equals, IsNotEmpty, Matches } from 'class-validator';

export class UpdateUserDto {

	@IsNotEmpty()
	oldPassword: string;

	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})
	newPassword: string;

	@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,30}$/, {
		message: 'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
	})
	repeatNewPassword: string;

}

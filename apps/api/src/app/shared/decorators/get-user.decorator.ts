import { createParamDecorator, ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { User } from '../../modules/auth/entities/user.entity';

/**
 * Used to get the user from the request
 */
export const GetUser = createParamDecorator((userType: string, ctx: ExecutionContext): Omit<User, 'password'> => {
	const req = ctx.switchToHttp().getRequest();
	const user = req.user;
	if (user.userType !== userType) {
		throw new UnauthorizedException();
	}
	return user;
});

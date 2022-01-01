import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { User } from '../../modules/auth/entities/user.entity';

/**
 * Used to get the user from the request
 */
export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): Omit<User, 'password'> => {
	const req = ctx.switchToHttp().getRequest();
	return req.user;
});

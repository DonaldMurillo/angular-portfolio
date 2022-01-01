
import { JwtPayload } from '@angular-portfolio/api-interfaces';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConfig } from '../../../configs/jwt.config';
import { AuthService } from '../auth.service';
import { User } from "../entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService, configService: ConfigService) {
		super({
			secretOrKey: jwtConfig(configService).secret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	/** Overrides default behavior */
	async validate(payload: JwtPayload): Promise<Omit<User, 'password'>> {
		const { username } = payload;
		const user: User = (await this.authService.findOne(username));
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}

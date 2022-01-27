import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

/**
 * Setup default jwt config in the application
 * @param config {ConfigService}
 */
export const jwtConfig = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get('TOKEN_SECRET'),
  signOptions: {
    expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN'),
  },
});

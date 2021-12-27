import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from '../../configs/jwt.config';

@Module({
  imports: [
    //this is just for autosync on database
    TypeOrmModule.forFeature([
			User,
		]),
    JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: jwtConfig,
			inject: [ConfigService],
		}),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

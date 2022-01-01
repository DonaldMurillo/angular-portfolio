import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    //this is just for autosync on database
    TypeOrmModule.forFeature([
			UserProfile,
		]),
    AuthModule

  ],
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}

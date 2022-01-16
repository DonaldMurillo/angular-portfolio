import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { AuthModule } from '../auth/auth.module';
import { Collection } from '../collections/entities/collection.entity';
import { CollectionItem } from '../collections/entities/collection-item.entity';

@Module({
  imports: [
    //this is just for autosync on database
    TypeOrmModule.forFeature([
			UserProfile, Collection, CollectionItem
		]),
    AuthModule

  ],
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}

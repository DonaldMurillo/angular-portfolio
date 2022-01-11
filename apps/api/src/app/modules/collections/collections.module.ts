import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionItem } from './entities/collection-item.entity';
import { AuthModule } from '../auth/auth.module';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UserProfileService } from '../user-profile/user-profile.service';

@Module({
  imports: [
    //this is just for autosync on database
    TypeOrmModule.forFeature([
			Collection, CollectionItem, UserProfile
		]),
    AuthModule,
    UserProfileModule
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, UserProfileService]
})
export class CollectionsModule {}

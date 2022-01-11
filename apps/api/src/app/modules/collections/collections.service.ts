import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { User } from '../auth/entities/user.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {

  constructor(
    private profileService: UserProfileService,
    @InjectRepository(Collection) private collectionRepository: Repository<Collection>){}

  async create(user: User, createCollectionDto: CreateCollectionDto) {
    const userProfile: UserProfile = await this.profileService.findOneByUser(user);
    if (!userProfile || userProfile.id !== createCollectionDto.profileId) {
      throw new UnauthorizedException();
    }

    const collection = this.collectionRepository.create({ ...createCollectionDto, profile: userProfile });
    return await tryAndSaveEntity(collection, this.collectionRepository);
  }

  findAll() {
    return `This action returns all collections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}

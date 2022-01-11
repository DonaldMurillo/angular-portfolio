import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UserProfileService {

  constructor(@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>) {}

  async create(createUserProfileDto: CreateUserProfileDto, user: User) {
    const userProfile = this.userProfileRepository.create({ ...createUserProfileDto, user });
    const { user: myUser, ...profile } = await tryAndSaveEntity(userProfile, this.userProfileRepository);
    return profile;
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  findOne(id: number) {
    // const userProfile = this.userProfileRepository.findOne({ user})
    return `This action returns a #${id} userProfile`;
  }

  async findOneByUser(user: User) {
    const userProfile = await this.userProfileRepository.findOne({ user });
    return userProfile;
  }


  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}

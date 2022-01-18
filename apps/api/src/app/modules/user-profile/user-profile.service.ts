import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { User } from '../auth/entities/user.entity';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { UserType } from '../../shared/enums/auth.enum';

@Injectable()
export class UserProfileService {

	constructor(
		@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
		private authService: AuthService,
	) { }

	async create(createUserProfileDto: CreateUserProfileDto, user: User) {
		const userProfile = this.userProfileRepository.create({ ...createUserProfileDto, user });
		const { user: myUser, ...profile } = await tryAndSaveEntity(userProfile, this.userProfileRepository);
		return profile;
	}

	async signIn(userCredentialsDto: CredentialsDto) {
		const auth = await this.authService.signIn(userCredentialsDto, UserType.user);
		const { user, ...profile } = await this.findOneByUser(auth.user);

		return { profile, accessToken: auth.accessToken };
	}

	async findOneByUser(user: User) {
		const userProfile = await this.userProfileRepository.findOne({ user });
		return userProfile;
	}

}

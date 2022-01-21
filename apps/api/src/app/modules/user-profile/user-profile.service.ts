//user profile service

import { AuthService } from './../auth/auth.service';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { User } from '../auth/entities/user.entity';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { UserType } from '../../shared/enums/auth.enum';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { CollectionItem } from '../collections/entities/collection-item.entity';
import { Collection } from '../collections/entities/collection.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class UserProfileService {

	constructor(
		@InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
		private authService: AuthService,
		private connection: Connection
	) { }


	async create(createUserProfileDto: CreateUserProfileDto, user: User) {
		const userProfile = this.userProfileRepository.create({ ...createUserProfileDto, user });
		const { user: myUser, ...profile } = await tryAndSaveEntity(userProfile, this.userProfileRepository);
		return profile;
	}

	async signIn(userCredentialsDto: CredentialsDto) {
		const auth = await this.authService.signIn(userCredentialsDto, UserType.user);

		const foundProfile = await this.findOneByUser(auth.user);

		if (!foundProfile) {
			return { profile: undefined, accessToken: auth.accessToken }
		}
		else {
			const { user, ...profile } = foundProfile;
			return { profile, accessToken: auth.accessToken };
		}
	}

	async findOneByUser(user: User) {
		const userProfile = await this.userProfileRepository.findOne({ user });
		return userProfile;
	}

	async update(user: User, updateUserProfileDto: UpdateUserProfileDto) {
		//check profile exist
		const userProfile: UserProfile = await this.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		//avoid creation of same nickname on many users
		if (updateUserProfileDto.nickname) {
			const checkProfile = await this.userProfileRepository.findOne({ where: { nickname: updateUserProfileDto.nickname } })
			if (checkProfile) throw new UnauthorizedException();
		}

		const newUserProfile = this.userProfileRepository.merge(userProfile, updateUserProfileDto);
		return await tryAndSaveEntity(newUserProfile, this.userProfileRepository);
	}

	async remove(user: User) {
		//retrieve on a regular way every information we need, in this case, it will be, user, user-profile, collections, collection-items

		//bring user from db
		const dbUser: User = await this.authService.findOne(user.username);
		if (!dbUser) {
			//throw new UnauthorizedException();
			throw new Error("No user found");
		}

		//bring userProfile from db on transaction
		const userProfile = await this.userProfileRepository.findOne({ user: dbUser });
		if (!userProfile) {
			//throw new UnauthorizedException();
			throw new Error("No userProfile found");
		}

		const collections: Collection[] = [];
		const collectionItems: CollectionItem[] = [];

		//getting collections and collection items
		for (const collection of userProfile.collections) {
			//get all items on a single array
			collection.items.forEach(collectionItem => {
				collectionItems.push(collectionItem);
			});
			//get all collections on a single array
			collections.push(collection);

		}

		// get a connection and create a new query runner
		const queryRunner = this.connection.createQueryRunner();
		// establish real database connection using our new query runner
		await queryRunner.connect();
		//not needed as data to be deleted was pulled previously yet, leave on code for future purposes
		//// now we can execute any queries on a query runner, for example:
		//await queryRunner.query("SELECT * FROM users");
		//not needed as data to be deleted was pulled previously
		//// we can also access entity manager that works with connection created by a query runner:
		//const users = await queryRunner.manager.find();

		// lets now open a new transaction:
		await queryRunner.startTransaction();

		try {

			// execute some operations on this transaction:
			//select entity to be deleted by some value instead of sending full entity in case it has relationship properties
      //verify there are items and collections to be deleted
      if(collectionItems.length){
        await queryRunner.manager.delete(CollectionItem, collectionItems);
      }
      if(collections.length){
        await queryRunner.manager.delete(Collection, collections);

      }
			await queryRunner.manager.delete(UserProfile, { id: userProfile.id });
			await queryRunner.manager.delete(User, { id: dbUser.id });
			// commit transaction now:
			await queryRunner.commitTransaction();
		} catch (err) {
      // since we have errors let's rollback changes we made
			await queryRunner.rollbackTransaction();
      // you need to release query runner which is manually created:
      console.log(err);
      throw new ConflictException;
		} finally {

			// you need to release query runner which is manually created:
			await queryRunner.release();
		}
    return 'User Deleted';
	}

}

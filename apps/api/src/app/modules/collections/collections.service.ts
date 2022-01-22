import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { User } from '../auth/entities/user.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { UserProfileService } from '../user-profile/user-profile.service';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionItem } from './entities/collection-item.entity';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {

	constructor(
		private profileService: UserProfileService,
		@InjectRepository(Collection) private collectionRepository: Repository<Collection>,
		@InjectRepository(CollectionItem) private collectionItemRepository: Repository<CollectionItem>,
    @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>

	) { }

	//create new collection
	async create(user: User, createCollectionDto: CreateCollectionDto) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile || userProfile.id !== createCollectionDto.profileId) {
			throw new UnauthorizedException();
		}
		const reviewCollection = await this.collectionRepository.find({ where: { profile: userProfile, name: createCollectionDto.name } })
		//avoid creation of same collection name for one user
		if (reviewCollection.length) {
			throw new UnauthorizedException();
		}
		const collection = this.collectionRepository.create({ ...createCollectionDto, profile: userProfile });
		const { profile, ...newCollection } = await tryAndSaveEntity(collection, this.collectionRepository);
		return newCollection;
	}

	//list collections from user
	async userCollections(user: User) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}
		const collections = this.collectionRepository.find({ where: { profile: userProfile } })

		return await collections;

	}

	//find collection by id
	//empty throw error?
	async findOne(user: User, id: string): Promise<[Collection, UserProfile]> {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		const existCollection = userProfile.collections.find(col => col.id === id);
		if (!existCollection) {
			throw new NotFoundException();
		}

		return [existCollection, userProfile];
	}

	//update modifiable properties on collection
	async update(user: User, id: string, updateCollectionDto: UpdateCollectionDto) {

		const [previousCollection, userProfile]  = await this.findOne(user,id);

		//check if name to be assigned is not in use for another collection
		//same name can be used in case it is not other collection
		if (updateCollectionDto.name) {
			const namedCollection = userProfile.collections.find(col => col.name === updateCollectionDto.name);
			if (namedCollection && namedCollection !== previousCollection) {
				throw new UnauthorizedException();
			}
		}

		//pass validation then update
		const updatedCollection = { ...updateCollectionDto, profile: userProfile, id: id };
		return tryAndSaveEntity(updatedCollection, this.collectionRepository);

	}

	//remove collection from DB, yet, does not cascade
	//should be something like change isActive property
	//should cascade on both cases
	async remove(user: User, id: string) {

		await this.findOne(user,id);

		return await this.collectionRepository.delete({ id: id });
	}

	//create a new item on a collection
	async createCollectionItem(user: User, collectionId: string, createCollectionItemDto: CreateCollectionItemDto) {
		//validate user exist
		const [existCollection]  = await this.findOne(user, collectionId);

		const existItem = existCollection.items.find(col => col.scryfallId === createCollectionItemDto.scryfallId);
		if (existItem) {
			// IF EXISTS INCREMENT QUANTITY
			return await tryAndSaveEntity({ ...existItem, quantity: existItem.quantity + 1}, this.collectionItemRepository);
		}

		//save collectionItem
		const item = this.collectionItemRepository.create({ ...createCollectionItemDto, collection: existCollection });
		const { collection, ...newItem } = await tryAndSaveEntity(item, this.collectionItemRepository);

		return newItem;
	}

	//find collection by id
	//empty throw error?
	async findCollectionItem(user: User, collectionId: string, itemId: string) {

		const [existCollection]  = await this.findOne(user, collectionId);

		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new NotFoundException();
		}

		return existItem;
	}


	async updateCollectionItem(user: User, collectionId: string, itemId: string, updateCollectionItemDto: UpdateCollectionItemDto) {

		const [existCollection]  = await this.findOne(user, collectionId);

		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new NotFoundException();
		}

		const updatedCollectionItem = { ...updateCollectionItemDto, collection: existCollection, id: itemId };

		return tryAndSaveEntity(updatedCollectionItem, this.collectionItemRepository);
	}

	async removeCollectionItem(user: User, collectionId: string, itemId: string) {

		const [existCollection]  = await this.findOne(user, collectionId);

		//check if item to be deleted exist
		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new NotFoundException();
		}

		return await this.collectionItemRepository.delete({ id: itemId });
	}

  async share(user: User, userNickname: string, collectionName: string) {
    //verify actual user already have a profile set
    const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
      throw new UnauthorizedException();
		}

    //verify shared user profile exists
    const sharedUserProfile: UserProfile = await this.userProfileRepository.findOne({nickname: userNickname});
		if (!sharedUserProfile) {
			throw new NotFoundException();
		}

    //verify collection exist, and also, it is shareable
		const collection = sharedUserProfile.collections.find(col => col.name === collectionName && col.tradeable === true);
		if (!collection) {
			throw new NotFoundException();
		}

    return collection;

	}

}

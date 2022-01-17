import { ConflictException, ForbiddenException, GoneException, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exclusion, Repository } from 'typeorm';
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
		@InjectRepository(CollectionItem) private collectionItemRepository: Repository<CollectionItem>
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
	async findOne(user: User, id: string) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}
		const collection = await this.collectionRepository.find({ where: { profile: userProfile, id: id } })
		if (!collection.length) {
			throw new UnauthorizedException();
		}

		return collection;
	}

	//update modifiable properties on collection
	async update(user: User, id: string, updateCollectionDto: UpdateCollectionDto) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		//check if collection to be updated exist
		const previousCollection = userProfile.collections.find(col => col.id === id);
		//const oldCollection = await this.collectionRepository.find({where:{ profile: userProfile , id: id }})
		if (!previousCollection) {
			throw new UnauthorizedException();
		}

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
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		//check if collection to be deleted exist
		const existCollection = userProfile.collections.find(col => col.id === id);
		if (!existCollection) {
			throw new UnauthorizedException();
		}

		return await this.collectionRepository.delete({ id: id });
	}

	//create a new item on a collection
	async createCollectionItem(user: User, collectionId: string, createCollectionItemDto: CreateCollectionItemDto) {
		//validate user exist
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		//check if collection to be deleted exist
		const existCollection = userProfile.collections.find(col => col.id === collectionId);
		if (!existCollection) {
			throw new UnauthorizedException();
		}

		const existItem = existCollection.items.find(col => col.scryfallId === createCollectionItemDto.scryfallId);
		if (existItem) {
			throw new UnauthorizedException();
		}

		//save collectionItem
		const item = this.collectionItemRepository.create({ ...createCollectionItemDto, collection: existCollection });
		return await tryAndSaveEntity(item, this.collectionItemRepository);

	}

	//find collection by id
	//empty throw error?
	async findCollectionItem(user: User, collectionId: string, itemId: string) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}
		const existCollection = userProfile.collections.find(col => col.id === collectionId);
		if (!existCollection) {
			throw new UnauthorizedException();
		}

		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new UnauthorizedException();
		}

		return existItem;
	}


	async updateCollectionItem(user: User, collectionId: string, itemId: string, updateCollectionItemDto: UpdateCollectionItemDto) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}
		const existCollection = userProfile.collections.find(col => col.id === collectionId);
		if (!existCollection) {
			throw new UnauthorizedException();
		}

		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new UnauthorizedException();
		}

		const updatedCollectionItem = { ...updateCollectionItemDto, collection: existCollection, id: itemId };

		return tryAndSaveEntity(updatedCollectionItem, this.collectionItemRepository);
	}

	async removeCollectionItem(user: User, collectionId: string, itemId: string) {
		const userProfile: UserProfile = await this.profileService.findOneByUser(user);
		if (!userProfile) {
			throw new UnauthorizedException();
		}

		//check if collection to be deleted exist
		const existCollection = userProfile.collections.find(col => col.id === collectionId);
		if (!existCollection) {
			throw new UnauthorizedException();
		}

		//check if item to be deleted exist
		const existItem = existCollection.items.find(col => col.id === itemId);
		if (!existItem) {
			throw new UnauthorizedException();
		}

		return await this.collectionItemRepository.delete({ id: itemId });
	}

}

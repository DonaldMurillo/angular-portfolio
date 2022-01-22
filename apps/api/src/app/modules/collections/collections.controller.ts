import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { UserType } from '../../shared/enums/auth.enum';
import { User } from '../auth/entities/user.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('Collection')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}


  //create a new collection for logged user
  //avoid same user create same collection name
  @UseGuards(AuthGuard())
  @Post()
  create(@GetUser(UserType.user) user: User, @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(user, createCollectionDto);
  }

  //list user collections
  @UseGuards(AuthGuard())
  @Get()
  userCollections(@GetUser(UserType.user) user: User) {
    return this.collectionsService.userCollections(user);
  }

  //get collection by id
  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@GetUser(UserType.user) user: User, @Param('id') id: string) {
    return this.collectionsService.findOne(user, id);
  }

  //update collection by id
  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@GetUser(UserType.user) user: User, @Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsService.update(user, id, updateCollectionDto);
  }


  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@GetUser(UserType.user) user: User, @Param('id') id: string ) {
    return this.collectionsService.remove(user, id);
  }


  @UseGuards(AuthGuard())
  @Post(':collectionId/item')
  createCollectionItem(@GetUser(UserType.user) user: User, @Param('collectionId') collectionId: string, @Body() createCollectionItemDto: CreateCollectionItemDto) {
    return this.collectionsService.createCollectionItem(user, collectionId, createCollectionItemDto);
  }


  @UseGuards(AuthGuard())
  @Get(':collectionId/item/:itemId')
  findCollectionItem(@GetUser(UserType.user) user: User, @Param('collectionId') collectionId: string, @Param('itemId') itemId: string) {
    return this.collectionsService.findCollectionItem(user, collectionId, itemId);
  }


  //uuid is not equal to string?
  //not to verify isuuid on updatedto

  @UseGuards(AuthGuard())
  @Patch(':collectionId/item/:itemId')
  updateCollectionItem(@GetUser(UserType.user) user: User, @Param('collectionId') collectionId: string, @Param('itemId') itemId: string, @Body() updateCollectionItemDto: UpdateCollectionItemDto) {
    return this.collectionsService.updateCollectionItem(user, collectionId, itemId, updateCollectionItemDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':collectionId/item/:itemId')
  removeCollectionItem(@GetUser(UserType.user) user: User, @Param('collectionId') collectionId: string, @Param('itemId') itemId: string ) {
    return this.collectionsService.removeCollectionItem(user, collectionId, itemId);
  }

  @UseGuards(AuthGuard())
  @Get(':userNickname/:collectionName')
  share(@GetUser(UserType.user) user: User, @Param('userNickname') userNickname: string , @Param('collectionName') collectionName: string) {
    return this.collectionsService.share(user, userNickname, collectionName);
  }

}

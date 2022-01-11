import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, MisdirectedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { UserType } from '../../shared/enums/auth.enum';
import { User } from '../auth/entities/user.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('Collection')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(AuthGuard())
  @Post()
  create(@GetUser(UserType.user) user: User, @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(user, createCollectionDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionsService.update(+id, updateCollectionDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(+id);
  }

  @UseGuards(AuthGuard())
  @Get(':id/item/:itemId')
  findItem(@Param('id') id: string, @Param('itemId') itemId: string ) {
    return this.collectionsService.findOne(+id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id/item/:itemId')
  updateItem(@Param('id') id: string, @Param('itemId') itemId: string, @Body() updateCollectionDto: UpdateCollectionItemDto) {
    throw new MisdirectedException()
    //return this.collectionsService.update(+id, updateCollectionDto);
  }

}

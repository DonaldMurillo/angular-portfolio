import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from '../../shared/enums/auth.enum';
import { CredentialsDto } from '../auth/dto/credentials.dto';


/*
swagger tag header request
@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})*/
@ApiTags('User Profile')
@Controller('user-profile')
export class UserProfileController {
	constructor(private readonly userProfileService: UserProfileService) { }

	@UseGuards(AuthGuard())
	@Post('create-profile')
	/*swagger tag responses
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})*/
	create(@GetUser(UserType.user) user: User, @Body() createUserProfileDto: CreateUserProfileDto) {
		return this.userProfileService.create(createUserProfileDto, user);
	}

	@Post('sign-in')
	/*swagger tag responses
	@ApiResponse({ status: 201, description: 'The record has been successfully created.'})*/
	signIn(@Body() userCredentialsDto: CredentialsDto) {
		return this.userProfileService.signIn(userCredentialsDto);
	}

	//   @Get()
	//   findAll() {
	//     return this.userProfileService.findAll();
	//   }

	//   @Get(':id')
	//   findOne(@Param('id') id: string) {
	//     return this.userProfileService.findOne(+id);
	//   }

	//   @Patch(':id')
	//   update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
	//     return this.userProfileService.update(+id, updateUserProfileDto);
	//   }

	//   @Delete(':id')
	//   remove(@Param('id') id: string) {
	//     return this.userProfileService.remove(+id);
	//   }
}

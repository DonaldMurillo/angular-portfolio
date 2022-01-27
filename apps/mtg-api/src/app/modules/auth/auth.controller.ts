import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from '../../shared/enums/auth.enum';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('user-login')
  login(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto, UserType.user);
  }

  @Post('admin-login')
  adminLogin(@Body() credentialsDto: CredentialsDto) {
    return this.authService.signIn(credentialsDto, UserType.admin);
  }

  @UseGuards(AuthGuard())
  @Patch('password-update')
  passwordUpdate(
    @GetUser(UserType.user) user: User,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    return this.authService.updatePassword(user, updateUserPasswordDto);
  }

  //working, not in use
  //@UseGuards(AuthGuard())
  //@Patch('email-update')
  //emaildUpdate(@GetUser(UserType.user) user: User, @Body() emailRequest: User) {
  //  console.log();
  //  return this.authService.updateEmail(user, emailRequest.email);
  //}

  //expected to be done throught userProfile Module
  //remove( user: User) {
  //  return this.authService.remove(user);
  //}

  //working, not in use, in case user will be able to delete its own info
  //@UseGuards(AuthGuard())
  //@Delete('user-delete')
  //userDelete(@GetUser(UserType.user) user: User) {
  //	return this.authService.remove(user);
  //}

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
}

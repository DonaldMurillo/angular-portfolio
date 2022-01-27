import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from '@angular-portfolio/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { UserType } from '../../shared/enums/auth.enum';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const toCreate: CreateUserDto = {
      ...createUserDto,
      userType: UserType.user,
    };
    const user = this.userRepository.create(toCreate);

    await tryAndSaveEntity(user, this.userRepository);

    return this.signIn(createUserDto, UserType.user);
  }

  findOne(username: string) {
    return this.userRepository.findOne({ username });
  }

  async updatePassword(
    user: User,
    updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    //validate user exist and retrieve information
    const actualUser = await this.findOne(user.username);
    //check if user exist
    if (!actualUser) {
      throw new NotFoundException();
    }
    //compare received new passwords
    if (
      updateUserPasswordDto.newPassword !==
      updateUserPasswordDto.repeatNewPassword
    ) {
      throw new NotAcceptableException();
    }
    //compare new and old password not to match
    if (
      updateUserPasswordDto.oldPassword === updateUserPasswordDto.newPassword
    ) {
      throw new NotAcceptableException();
    }

    //compare old password
    if (
      !(await this.comparePassword(
        updateUserPasswordDto.oldPassword,
        actualUser.password
      ))
    ) {
      throw new NotAcceptableException();
    }

    //update password
    const salt = await bcrypt.genSalt();
    actualUser.password = await bcrypt.hash(
      updateUserPasswordDto.newPassword,
      salt
    );
    //save and return
    return await tryAndSaveEntity(actualUser, this.userRepository);
  }

  //not enabled on controller
  async updateEmail(user: User, newEmail: string) {
    //validate new email is an email
    if (!isEmail(newEmail)) {
      throw new NotAcceptableException();
    }

    //validate user exist and retrieve information
    const actualUser = await this.findOne(user.username);
    if (!actualUser) {
      throw new NotFoundException();
    }
    //validate new email is not assigned to another user
    const emailUser = await this.userRepository.findOne({ email: newEmail });
    if (emailUser) {
      throw new NotAcceptableException();
    }

    //update email
    actualUser.email = newEmail;
    //save and return
    return await tryAndSaveEntity(actualUser, this.userRepository);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signIn(
    dto: CredentialsDto,
    userType: UserType
  ): Promise<{ accessToken: string; user: User }> {
    const { username, password } = dto;
    const user = await this.userRepository.findOne({ username });
    if (
      user &&
      user.userType === userType &&
      (await this.comparePassword(password, user.password))
    ) {
      // const isCustomer = user.type === UserType.CUSTOMER;
      // const isAdmin = user.type === UserType.ADMIN;
      // const isCompany = user.type === UserType.COMPANY;

      const payload: JwtPayload = { username, userId: user.id, userType };
      const accessToken: string = await this.jwtService.signAsync(payload);
      return { accessToken, user };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  //To Be implement on/called by from userProfile Module
  //remove(user: User) {
  //  return this.userRepository.delete(user);
  //}

  //findAll() {
  //	return `This action returns all auth`;
  //}
}

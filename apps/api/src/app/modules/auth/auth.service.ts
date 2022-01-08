import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tryAndSaveEntity } from '../../shared/utils/base-functions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from '@angular-portfolio/api-interfaces';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { UserType } from '../../shared/enums/auth.enum';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

  async create(createUserDto: CreateUserDto) {
    // const { password, ...dto } = createUserDto;
		// const salt = await bcrypt.genSalt();
		// const hashedPassword = await bcrypt.hash(password, salt);
		const toCreate: CreateUserDto = { ...createUserDto, userType: UserType.user};

    const user = this.userRepository.create(toCreate);
    await tryAndSaveEntity(user, this.userRepository);

    return this.signIn(createUserDto, UserType.user);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(username: string) {
    return this.userRepository.findOne({ username });
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}

  async signIn(dto: CredentialsDto, userType: UserType): Promise<{ accessToken: string }> {
		const { username, password } = dto;
		const user = (await this.userRepository.findOne({username}));
		if (user && user.userType === userType && (await this.comparePassword(password, user.password))) {

			// const isCustomer = user.type === UserType.CUSTOMER;
			// const isAdmin = user.type === UserType.ADMIN;
			// const isCompany = user.type === UserType.COMPANY;

			const payload: JwtPayload = { username, userType };
			const accessToken: string = await this.jwtService.signAsync(payload);
			return { accessToken };
		} else {
			throw new UnauthorizedException('Please check your login credentials');
		}
	}
}

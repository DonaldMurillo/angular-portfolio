import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConnection } from './configs/typeorm.config';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { PassportModule } from '@nestjs/passport';
import { CollectionsModule } from './modules/collections/collections.module';

config();

@Module({
  imports: [
    //.env config
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: defaultConnection,
      inject: [ConfigService],
    }),
    AuthModule,
    UserProfileModule,
    CollectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

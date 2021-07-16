/*
 * @Author: your name
 * @Date: 2021-06-30 16:41:12
 * @LastEditors: your name
 * @LastEditTime: 2021-07-06 17:07:44
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserAuth } from '../userAuth/userAuth.entity';
import { UserService } from './user.service';
@Module({
  imports: [  TypeOrmModule.forFeature([User, UserAuth])],
  controllers: [UserController],
  providers: [UserService],
  exports: [ UserService ],
})
export class UserModule {}
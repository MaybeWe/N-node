/*
 * @Author: your name
 * @Date: 2021-06-30 16:41:12
 * @LastEditors: your name
 * @LastEditTime: 2021-06-30 16:53:10
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
@Module({
  controllers: [LoginController],
})
export class LoginModule {}

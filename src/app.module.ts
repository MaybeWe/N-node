/*
 * @Author: your name
 * @Date: 2021-06-30 15:30:29
 * @LastEditors: your name
 * @LastEditTime: 2021-06-30 16:58:28
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

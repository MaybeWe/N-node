/*
 * @Author: your name
 * @Date: 2021-06-30 15:30:29
 * @LastEditors: your name
 * @LastEditTime: 2021-06-30 16:27:28
 * @Description: file content
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();

/*
 * @Author: your name
 * @Date: 2021-06-30 15:30:29
 * @LastEditors: your name
 * @LastEditTime: 2021-06-30 16:27:28
 * @Description: file content
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  
}

bootstrap();

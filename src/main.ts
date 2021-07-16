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
// api文档插件
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('系统接口文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .addBearerAuth()
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
  
}

bootstrap();

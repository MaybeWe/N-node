/*
 * @Author: your name
 * @Date: 2021-06-30 15:30:29
 * @LastEditors: your name
 * @LastEditTime: 2021-07-06 16:28:28
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/sql';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    //注入env配置文件
    ConfigModule.forRoot({
      envFilePath: ['./sql.env'],
      load: [configuration],
    }),
    //用配置文件连接数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return config.get('database')
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

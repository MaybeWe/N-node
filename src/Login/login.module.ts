/*
 * @Author: your name
 * @Date: 2021-06-30 16:41:12
 * @LastEditors: your name
 * @LastEditTime: 2021-07-06 17:07:44
 * @Description: file content
 */
import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { Encrypt } from '../common/encrypt';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [ 
        UserModule,
        AuthModule
    ],
    controllers: [LoginController],
    providers: [ Encrypt ],
})
export class LoginModule {}
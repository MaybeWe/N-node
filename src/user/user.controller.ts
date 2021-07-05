/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:13
 * @LastEditTime: 2021-06-30 17:03:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Encrypt } from '../common/encrypt'


@Controller('user')
export class UserController {
    constructor(
      private readonly usersService: UserService,
      private readonly Encrypt: Encrypt
    ){
    }
    
    @Post('/register')
    async register(@Body() params) {
        let obj:any = await this.Encrypt.encode({password: params.password})
        obj = {...obj, name: params.name}
        // let md5 = createHash("md5");
        // params.password = md5.update(params.password).digest("hex");
        return await this.usersService.create(obj);
    }

    @Post('/login')
    async login(@Body() params) {
        let user = await this.usersService.findOne({where: {name: params.name}, relations: ['code']})
        if (!user) {
            throw new HttpException('账号不存在',HttpStatus.BAD_REQUEST)
        }
        let obj:any = await this.Encrypt.encode({password: params.password, code: user.authcode})
        if (obj.password == user.password) {
            console.log("登录成功")
        }
    }
}

/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:13
 * @LastEditTime: 2021-07-06 16:18:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Encrypt } from '../common/encrypt'
import { User } from './user.interface'

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
        return await this.usersService.create(obj);
    }

    @Post('/login')
    async login(@Body() params): Promise<User> {
        let user = await this.usersService.findJoinAuth({ where: {name: params.name}, select: ['user.password']})
        if (!user) {
            throw new HttpException('账号不存在',HttpStatus.BAD_REQUEST)
        }
        const code = user.code ? user.code.code : '';
        let obj:any = await this.Encrypt.encode({ password: params.password, code: code })
        if (obj.password == user.password) {
            console.log("登录成功")
            return { id: user.id, name: user.name }
        }
        else {
            throw new HttpException('账号或者密码不正确',HttpStatus.BAD_REQUEST)
        }
    }
}

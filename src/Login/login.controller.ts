/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:13
 * @LastEditTime: 2021-07-06 16:18:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Encrypt } from '../common/encrypt'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('')
export class LoginController {
    constructor(
      private readonly usersService: UserService,
      private readonly Encrypt: Encrypt,
      private readonly authService: AuthService,
    ){
    }
    
    @Post('/register')
    async register(@Body() params) {
        let obj:any = await this.Encrypt.encode({password: params.password})
        obj = {...obj, name: params.name}
        return await this.usersService.create(obj);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}

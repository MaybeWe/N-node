/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:13
 * @LastEditTime: 2021-07-06 16:18:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('user')
export class UserController {
    constructor(
      private readonly usersService: UserService,
    ){
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('getdd')
    getProfile(@Request() req) {
        return req.user;
    }
    
}
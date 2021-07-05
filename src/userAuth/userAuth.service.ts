/*
 * @Author: your name
 * @Date: 2021-06-30 15:40:55
 * @LastEditors: your name
 * @LastEditTime: 2021-06-30 16:08:10
 * @Description: file content
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserAuth } from './userAuth.entity';

@Injectable()
export class UserService {
    constructor(  
        @InjectRepository(UserAuth)
        private usersRepository: Repository<UserAuth>,
    ){
    
    }

}
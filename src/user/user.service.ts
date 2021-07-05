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
import { User } from './user.entity';
import { getConnection } from "typeorm";

@Injectable()
export class UserService {
    constructor(  
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){
    
    }

    async create(user: User) {
        let { name } = user;
        console.log(user,name)
        let u = await getConnection()
                    .createQueryBuilder()
                    .select()
                    .from(User, "user")
                    .where("user.name = "+name)
                    .innerJoinAndSelect("user.authcode", "user_auth")
                    .printSql()
                    .getSql();
        console.log(u)
        if (u) {
            throw new HttpException('账号已存在',HttpStatus.BAD_REQUEST)
        }
        user.create_time = new Date().getTime().toString()
        console.log(user)
        // return await this.usersRepository.save(user);
    }

    findOne(params: Object): Promise<User> {
        return this.usersRepository.findOne(params);
    }
}
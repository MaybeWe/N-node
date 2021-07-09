import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository, getConnection, createQueryBuilder  } from 'typeorm';
import { User } from './user.entity';
import { UserAuth } from '../userAuth/userAuth.entity';
@Injectable()
export class UserService {
    constructor(  
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserAuth)
        private userAuthsRepository: Repository<UserAuth>,
    ){
    
    }

    async create(params: any) {
        let u = await this.findJoinAuth({ where: {name: params.name} });
        console.log(u)
        if (u) {
            throw new HttpException('账号已存在',HttpStatus.BAD_REQUEST)
        }
        params.create_time = new Date().getTime().toString()
        let user = await this.usersRepository.save(params);
        await this.userAuthsRepository.save({ userId: user.id, code : user.code });
        return {name: user.name, id: user.id};
    }

    async findJoinAuth(params: any): Promise<any> {
        const { where } = params;
        const select = params.select || [];
        let key = Object.keys(where)[0];
        return await getRepository(User).createQueryBuilder("user")
                    .leftJoinAndMapOne("user.code", UserAuth, "user_auth", "user_auth.userId = user.id")
                    .select(["user.id", "user.name", "user.create_time", "user_auth.code", ...select ])
                    .where(`user.${key} = :${key}`, where)
                    .getOne();
    }

    async findOne(where: any): Promise<any> {
        let key = Object.keys(where)[0];
        return await getRepository(User).createQueryBuilder("user")
                    .select(["user.id", "user.name", "user.create_time"])
                    .where(`user.${key} = :${key}`, where)
                    .getOne();
    }
}
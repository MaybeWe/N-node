import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Encrypt } from '../common/encrypt'
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly Encrypt: Encrypt,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        let user = await this.userService.findJoinAuth({ where: {name: username}, select: ['user.password']})
        if (!user) {
            throw new HttpException('账号不存在',HttpStatus.BAD_REQUEST)
        }
        const code = user.code ? user.code.code : '';
        let obj:any = await this.Encrypt.encode({ password: pass, code: code })
        if (obj.password == user.password) {
            return { id: user.id, name: user.name }
        }
        else {
            throw new HttpException('账号或者密码不正确',HttpStatus.BAD_REQUEST)
        }
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
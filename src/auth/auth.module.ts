import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { Encrypt } from '../common/encrypt';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
@Module({
    imports: [ 
        // PassportModule.register({ defaultStrategy: 'jwt' }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                secret: process.env.jwt_secret,
                signOptions: { expiresIn: '1h', },
            }),
        }), 
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, Encrypt ],
    exports: [AuthService],
})
export class AuthModule {}

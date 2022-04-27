import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        HttpModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
        secret: configService.get('TOTO'),
        signOptions: {expiresIn: '10800s'},
    }),
    inject: [ConfigService],
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}


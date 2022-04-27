import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService, private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('TOTO'),
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findOne(payload.username)
        const {username, id, email, widgetsList} = user;
        return {
            _id: id,
            username: username,
            email: email,
            widgetsList: widgetsList,
        };
    }
}
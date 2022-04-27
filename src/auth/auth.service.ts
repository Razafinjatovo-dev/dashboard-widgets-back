import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private httpService: HttpService) {
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (bcrypt.compareSync(password, user.password)) {
            const {username, id, email, widgetsList} = user;
            let allResults = [];
            //@ts-ignore
            let requests = widgetsList.map(w => this.httpService.get(w.endpoint).toPromise());
            allResults = await Promise.all(requests).then(responses => {
                let counter = 0
                responses.forEach(response => {
                    //@ts-ignore
                    allResults.push({
                        service_id: widgetsList[counter].service._id,
                        service: widgetsList[counter].service.name, widget_id: widgetsList[counter]._id,
                        widget_name: widgetsList[counter].name,
                        data: response.data
                    });
                    counter++;
                });
                return allResults;
            });

            return {
                _id: id,
                username: username,
                email: email,
                widgetsList: widgetsList,
                widgetsData: allResults,
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user._id};

        return {
            access_token: this.jwtService.sign(payload),
            user: user
        };
    }
}

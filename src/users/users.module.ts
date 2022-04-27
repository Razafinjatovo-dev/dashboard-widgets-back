import {Module} from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";
import {RolesGuard} from "../roles/roles.guard";


@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {
}

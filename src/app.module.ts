import {HttpModule} from "@nestjs/axios";
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ServicesModule} from "./services/services.module";
import {ConfigModule} from '@nestjs/config';
import {WidgetsModule} from './widgets/widgets.module';
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {UsersService} from "./users/users.service";
import {UserSchema} from "./users/schemas/user.schema";
import {WidgetSchema} from "./widgets/schemas/widget.schema";

@Module({
    imports: [
        HttpModule,
        AuthModule,
        ServicesModule,
        UsersModule,
        ConfigModule.forRoot({isGlobal: true}),
        // ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        WidgetsModule,
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'Widget', schema: WidgetSchema}]),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

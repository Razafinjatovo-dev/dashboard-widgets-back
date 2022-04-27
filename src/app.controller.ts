import {HttpService} from "@nestjs/axios";
import {Controller, Get, Post, Request, UseGuards, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthService} from "./auth/auth.service";
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./users/interfaces/user.interface";

@Controller()
export class AppController {
    // constructor(private readonly appService: AppService) {}
    constructor(
        private readonly authService: AuthService,
        private readonly appService: AppService,
        private httpService: HttpService
    ) {
    }

    @Get('test')
    getTest(): string {
        return 'Test route,Ni Hao ma?'
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(): string {
        return 'Ni Hao ma?'
    }


    // @UseGuards(LocalAuthGuard)
    @Get('/myWidgetsData/:userId')
    async getMyWidgetsData(@Param('userId') userId) {
        // console.log(userId)
    }

}

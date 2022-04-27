import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {User} from "./interfaces/user.interface";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/role.enum";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }


    @Get('test')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.User)
    sayhello(): string {
        return 'admin powa'
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id): Promise<User> {
        return this.usersService.findOneById(id);
    }

    @Post()
    // @Roles(Role.Admin)
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    updateAdmin(@Body() updateUserDto: CreateUserDto, @Param('id') id): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.usersService.delete(id);
    }


}

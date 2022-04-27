import {Controller, Get, Post, Put, Patch, Delete, Body, Param} from '@nestjs/common';
import {CreateWidgetDto} from "./dto/create-widget.dto";
import {UpdateWidgetDto} from "./dto/update-widget.dto";
import {WidgetsService} from "./widgets.service";
import {Widget} from "./interfaces/widget.interface";
import {Service} from "../services/interfaces/service.interface";
import {UsersService} from "../users/users.service";
import {HttpService} from "@nestjs/axios";


@Controller('widgets')
export class WidgetsController {
    constructor(
        private readonly widgetsServices: WidgetsService,
        private usersService: UsersService,
        private httpService: HttpService
    ) {
    }

    @Post()
    create(@Body() createWidgetDto: CreateWidgetDto): Promise<Widget> {
        return this.widgetsServices.create(createWidgetDto);
    }

    @Get()
    async findAll(): Promise<Widget[]> {
        return this.widgetsServices.findAll();
    }

    @Get(':id')
    findOne(): string {
        return 'find one widget'
    }

    @Delete()
    delete(): string {
        return 'delete one widget'
    }

    @Put(':id')
    update(@Body() updateWidgetDto: UpdateWidgetDto, @Param('id') id): string {
        return `widget id : ${id} update content ${updateWidgetDto.description}`
    }

    //one user request his/her widgets datas
    @Get('/userWidgets/:userId')
    async getMyWidgetsData(@Param('userId') userId) {
        //fetch user
        const user = await this.usersService.findOneById(userId);
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

        return{
            widgetsData: allResults
        }
    }
}



import {Controller, Get, Post, Put, Patch, Delete, Body, Param} from '@nestjs/common';
import {CreateServiceDto} from "./dto/create-service.dto";
import {UpdateServiceDto} from "./dto/update-service.dto";
import {ServicesService} from "./services.service";
import {Service} from "./interfaces/service.interface";

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
        return this.servicesService.create(createServiceDto)
    }

    @Get()
    async findAll(): Promise<Service[]> {
        return this.servicesService.findAll();
    }


    @Get(':id')
    async findOne(@Param('id') id): Promise<Service> {
      return this.servicesService.findOne(id);
    }



    @Delete(':id')
    delete(@Param('id') id): Promise<Service> {
        return this.servicesService.delete(id);
    }

    @Put(':id')
    update(@Body() updateServiceDto: UpdateServiceDto, @Param('id') id): Promise<Service> {
        return this.servicesService.update(id,updateServiceDto);
    }
}

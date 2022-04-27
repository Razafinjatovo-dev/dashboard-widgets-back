import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Service, ServiceDocument} from './schemas/service.schema';
import {CreateServiceDto} from "./dto/create-service.dto";
import {UpdateServiceDto} from "./dto/update-service.dto";

@Injectable()
export class ServicesService {
    constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {
    }

    async create(createServiceDto: CreateServiceDto): Promise<Service> {
        const createdService = new this.serviceModel(createServiceDto);
        return createdService.save();
    }

    async findAll(): Promise<Service[]> {
        return this.serviceModel.find().populate('widgets').exec();
    }

    async findOne(id: string): Promise<Service> {
        return this.serviceModel.findOne({_id: id}).populate('widgets').exec();;
    }

    async update(id: string, service: UpdateServiceDto): Promise<Service> {
        return this.serviceModel.findByIdAndUpdate(id, service, {new: true});
    }

    async delete(id: string): Promise<Service> {
        return this.serviceModel.findByIdAndRemove(id);
    }

}

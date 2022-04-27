import {Model} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Widget, WidgetDocument} from "./schemas/widget.schema";
import {CreateWidgetDto} from "./dto/create-widget.dto";
import {UpdateWidgetDto} from "./dto/update-widget.dto";
import {Service} from "../services/schemas/service.schema";
import {User} from "../users/interfaces/user.interface";

@Injectable()
export class WidgetsService {
    constructor(@InjectModel(Widget.name) private widgetModel: Model<WidgetDocument>) {
    }

    async create(createWidgetDto: CreateWidgetDto): Promise<Widget> {
        const createdWidget = new this.widgetModel(createWidgetDto);
        return createdWidget.save();
    }

    async findAll(): Promise<Widget[]> {
        return this.widgetModel.find().populate('service').exec();
        // return this.widgetModel.find();
    }

    async findOne(id: string): Promise<Widget> {
        return this.widgetModel.findOne({_id: id}).populate('service').exec();;
    }

    async update(id: string, widget: UpdateWidgetDto): Promise<Widget> {
        return this.widgetModel.findByIdAndUpdate(id, widget, {new: true});
    }

    async delete(id: string): Promise<Widget> {
        return this.widgetModel.findByIdAndRemove(id);
    }

}

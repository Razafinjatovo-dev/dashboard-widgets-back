import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {Service} from "../../services/schemas/service.schema";


export type WidgetDocument = Widget & Document;

@Schema({timestamps: true})
export class Widget {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Service'})
    service: string;

    @Prop({unique: true, required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop()
    endpoint: string;

    @Prop([])
    params: object;

}

export const WidgetSchema = SchemaFactory.createForClass(Widget);
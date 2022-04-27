import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {Widget} from "../../widgets/schemas/widget.schema";



export type ServiceDocument = Service & Document;

@Schema({timestamps: true})
export class Service {
    @Prop({unique: true, required: true})
    name: string;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}])
    widgets: object;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
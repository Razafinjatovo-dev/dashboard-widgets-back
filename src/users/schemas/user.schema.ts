import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
// import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import {Widget} from "../../widgets/schemas/widget.schema";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({unique: true, required: true})
    username: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Widget', default: []}])
    widgetsList: string[];

    @Prop({default: ['user']})
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
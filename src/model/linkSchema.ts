import { Schema, Document, model, Types } from "mongoose";

export interface ILinks extends Document{
    longLink: string;
    shortLink: string;
    noOfClicks?: number;
    title?: string;
    customName?: string;
    users: Types.ObjectId;
    urlId: string;
}

const linkSchema: Schema = new Schema<ILinks>({
    longLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
    noOfClicks: {
        type: Number,
        default: 0
    },
    title: {
        type: String
    },
    customName: {
        type: String
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    urlId: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Link = model<ILinks>("Links", linkSchema);

export { Link };
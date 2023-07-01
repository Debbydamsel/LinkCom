"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users"
    },
    urlId: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Link = (0, mongoose_1.model)("Links", linkSchema);
exports.Link = Link;

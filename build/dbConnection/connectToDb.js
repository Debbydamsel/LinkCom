"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require("dotenv").config();
//import "dotenv/config";
//import dotenv from "dotenv"
// dotenv.config();
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const mongo_uri = process.env.MONGO_URI;
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            yield mongoose_1.default.connect(`${mongo_uri}`, options);
            console.log("connected to mongodb successfully");
        }
        catch (error) {
            console.log("error connecting to mongodb", error);
        }
    });
}
exports.default = connectToDb;

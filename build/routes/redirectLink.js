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
const express_1 = __importDefault(require("express"));
const linkSchema_1 = require("../model/linkSchema");
require("dotenv/config");
const redirectRoute = express_1.default.Router();
redirectRoute.get("/:linkId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUrl = yield linkSchema_1.Link.findOne({ urlId: req.params.linkId });
        if (getUrl) {
            yield getUrl.updateOne({ urlId: req.params.linkId }, { $inc: { clicks: 1 } });
            return res.redirect(getUrl.longLink);
        }
        else {
            res.status(404).json("Url not found!");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
}));
exports.default = redirectRoute;

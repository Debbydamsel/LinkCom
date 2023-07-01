"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linkRoute = express_1.default.Router();
const linkController_1 = require("../controllers/linkController");
//render the shorten url page
linkRoute.get("/getAuthPage", linkController_1.getUrlPage);
//generate a shortened url
linkRoute.post("/getAuthPage", linkController_1.getShortenedUrl);
exports.default = linkRoute;

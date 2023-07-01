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
exports.getShortenedUrl = exports.getUrlPage = void 0;
const linkSchema_1 = require("../model/linkSchema");
require("dotenv/config");
const valid_url_1 = __importDefault(require("valid-url"));
const nanoid_1 = require("nanoid");
const baseUrl = process.env.BASE_URL;
const getUrlPage = (req, res) => {
    res.render("linkHistory");
};
exports.getUrlPage = getUrlPage;
const getShortenedUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longLink, title, customName } = req.body;
    console.log(longLink);
    if (!valid_url_1.default.isWebUri(baseUrl)) {
        return res.status(401).json("Invalid base url!");
    }
    const generateId = (0, nanoid_1.nanoid)(6);
    if (valid_url_1.default.isWebUri(longLink)) {
        try {
            const getUrl = yield linkSchema_1.Link.findOne({ longLink });
            console.log(getUrl);
            if (getUrl) {
                res.json({ message: "This url already exists", getUrl });
            }
            else {
                const shortUrl = baseUrl + "/" + generateId;
                const customUrl = baseUrl + "/" + customName;
                if (customName) {
                    let urlInfo = new linkSchema_1.Link({
                        longLink,
                        shortLink: customUrl,
                        title,
                        urlId: generateId
                    });
                    yield urlInfo.save();
                    return res.json({ urlInfo });
                }
                else {
                    const urlInfo = new linkSchema_1.Link({
                        longLink,
                        shortLink: shortUrl,
                        title,
                        urlId: generateId
                    });
                    yield urlInfo.save();
                    console.log(urlInfo);
                    return res.json({ urlInfo });
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occured while generating a shortened link", error });
        }
    }
    else {
        res.status(401).json("Invalid url!");
    }
});
exports.getShortenedUrl = getShortenedUrl;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwToken = process.env.SECRET_KEY;
const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, jwToken, (err, verifiedUser) => {
            if (err) {
                res.redirect("/users/sign-up");
            }
            //console.log(verifiedUser);
            next();
        });
    }
    else {
        res.redirect("/users/sign-up");
    }
};
exports.auth = auth;

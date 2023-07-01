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
exports.userLogin = exports.userSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const userSchema_1 = require("../model/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwToken = process.env.SECRET_KEY;
const userSignup = (req, res) => {
    const { username, email, password } = req.body;
    const expiryDate = 3 * 24 * 60 * 60 * 1000;
    bcrypt_1.default.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = new userSchema_1.User({
                username,
                email,
                password: hash
            });
            const savedUser = yield newUser.save();
            const token = yield jsonwebtoken_1.default.sign({ id: savedUser._id }, jwToken);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: expiryDate
            });
            res.status(200).json({ user: savedUser._id });
        }
        catch (err) {
            res.status(422).json({ err });
        }
    }));
};
exports.userSignup = userSignup;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const expiryDate = 3 * 24 * 60 * 60 * 1000;
    try {
        const findUser = yield userSchema_1.User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: "Invalid details, please enter the correct details or sign up!" });
        }
        const compareBothPasswords = findUser.comparePassword(password);
        if (!compareBothPasswords) {
            return res.status(401).json({ message: "Invalid password!" });
        }
        const token = yield jsonwebtoken_1.default.sign({ id: findUser._id }, jwToken);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: expiryDate
        });
        return res.status(200).json({ user: findUser._id });
    }
    catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});
exports.userLogin = userLogin;

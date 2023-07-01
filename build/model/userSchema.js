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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Your email field is empty"],
        match: [/.+\@.+\..+/, "Please enter a valid email"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Your password should not be less than 6 characters"]
    },
    link: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Links"
    }
}, { timestamps: true });
//Prehook, After any user that signs up, the password gets hashed with the prehook b4 its being saved to the database. 
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        if (user.isModified("password")) {
            bcrypt_1.default.genSalt(10, function (err, salt) {
                if (err)
                    return next(err);
                bcrypt_1.default.hash(user.password, salt, function (err, hash) {
                    if (err)
                        return next(err);
                    user.password = hash;
                    next();
                });
            });
        }
    });
});
// To ensure that the user enters the correct cretdentials for logging in, we use the ffg codes
userSchema.methods.comparePassword = function (userPassword) {
    let password = this.password;
    const validPassword = bcrypt_1.default.compare(userPassword, password);
    return validPassword;
};
//to exclude the password from being sent back to the user
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};
const User = (0, mongoose_1.model)("Linkusers", userSchema);
exports.User = User;

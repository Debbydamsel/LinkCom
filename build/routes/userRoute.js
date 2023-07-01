"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import "dotenv/config";
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
// import dotenv  from 'dotenv';
// import path from "path";
// dotenv.config({ path: path.join(__dirname, "..", ".env") });
const userRoute = express_1.default.Router();
//user sign up
userRoute.get("/sign-up", (req, res) => {
    res.render("sign-up");
});
userRoute.get("/log-in", (req, res) => {
    res.render("sign-in");
});
userRoute.post("/sign-up", userController_1.userSignup);
//user login
userRoute.post("/log-in", userController_1.userLogin);
//GET USER INFO FROM DB
// export const userInfo = (req: Request, res: Response) => {
//     const { id } = req.body.user;
//     try {
//         const user = User.findOne({ _id: id });
//         if (!user) {
//             return res.status(404).json("user not found!");
//         }
//         return res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }
exports.default = userRoute;

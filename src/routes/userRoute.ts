//import "dotenv/config";
import express, { Request, Response } from "express";
import { userLogin, userSignup } from "../controllers/userController";
// import dotenv  from 'dotenv';
// import path from "path";
// dotenv.config({ path: path.join(__dirname, "..", ".env") });
const userRoute = express.Router();


//user sign up

userRoute.get("/sign-up", (req: Request, res: Response) => {
    res.render("sign-up");
})

userRoute.get("/log-in", (req: Request, res: Response) => {
    res.render("sign-in");
})

userRoute.post("/sign-up", userSignup)

//user login
userRoute.post("/log-in", userLogin)

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


export default userRoute;


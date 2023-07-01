import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { User, IUsers, IUsersLogin } from "../model/userSchema";
import { HydratedDocument } from "mongoose";
import jwt from "jsonwebtoken"
const jwToken: string = process.env.SECRET_KEY as string;


export const userSignup = (req: Request, res: Response) => {
    const { username, email, password }: IUsers = req.body;
    const expiryDate = 3 * 24 * 60* 60 * 1000;

    bcrypt.hash(password, 10, async(err, hash) => {
        try {
        const newUser: HydratedDocument<IUsers> = new User ({
            username,
            email,
            password: hash
        })
        
        const savedUser = await newUser.save();
        
        const token = await jwt.sign({id: savedUser._id}, jwToken);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: expiryDate
        });
        res.status(200).json({user: savedUser._id});
       
    } catch (err) {
        res.status(422).json({ err });
    }
    })
    
}

export const userLogin = async(req: Request, res: Response) => {
    const { email, password }: IUsersLogin = req.body;
    const expiryDate = 3 * 24 * 60* 60 * 1000;

    try {

        const findUser = await User.findOne({email});
        if (!findUser) {
            return res.status(404).json({message: "Invalid details, please enter the correct details or sign up!"});
        }

        const compareBothPasswords = findUser.comparePassword(password);
        if (!compareBothPasswords) {
            return res.status(401).json({message: "Invalid password!"});
        }
        const token = await jwt.sign({id: findUser._id, username: findUser.username}, jwToken);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: expiryDate
        });
        return res.status(200).json({user: findUser._id });
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }

}
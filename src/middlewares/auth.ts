import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
const jwToken: string = process.env.SECRET_KEY as string;

export const auth = (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.jwt;
        if(token) {
            jwt.verify(token, jwToken, (err: any, verifiedUser: any) => {
                if (err) {
                    res.redirect("/users/sign-up");
                } 
                //console.log(verifiedUser);
                next();
            });

        } else {
            res.redirect("/users/sign-up");
        }
        
    
    
}
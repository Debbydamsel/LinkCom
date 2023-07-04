import {Request, Response} from "express";
import "dotenv/config";
import {Link, ILinks} from "../model/linkSchema";
import { User } from "../model/userSchema";
import validUrl from "valid-url";
import { nanoid }  from "nanoid";
import { HydratedDocument } from "mongoose";
import jwt  from "jsonwebtoken";
const jwToken: string = process.env.SECRET_KEY as string;
const baseUrl: string = process.env.BASE_URL as string;




export const getUrlPage = async(req: Request, res: Response) => {
    const token = req.cookies.jwt;

    const user = jwt.verify(token, jwToken) as jwt.JwtPayload;
    //console.log(user);
    const getCurrentUser = await User.findById(user._id);
    //console.log(getCurrentUser);
    res.render("linkHistory", { currentUser: getCurrentUser?.username });
    
}


export const getShortenedUrl = async(req: Request, res: Response) => {
    const {longLink, customName, title}: ILinks = req.body;
    //console.log({longLink});

    if (!validUrl.isWebUri(baseUrl)) {
        return res.status(401).json("Invalid base url!");
    }

    const generateId = nanoid(6);

    if (validUrl.isWebUri(longLink)) {

        try {
            const getUrl = await Link.findOne({longLink});
            console.log(getUrl);

             if(getUrl) {
                res.json({message: "This url already exists", getUrl});
            } else {
                const shortUrl = baseUrl + "/" + generateId;
                const customUrl = baseUrl + "/" + customName;
                if (customName) {
                    let urlInfo: HydratedDocument<ILinks> = new Link({
                        longLink,
                        shortLink: customUrl,
                        title,
                        urlId: generateId
    
                    })
                    await urlInfo.save();
                    return  res.json({urlInfo});
                } else {
                    const urlInfo: HydratedDocument<ILinks> = new Link({
                        longLink,
                        shortLink: shortUrl,
                        title,
                        urlId: generateId
    
                    })
                    await urlInfo.save();
                    //console.log(urlInfo);
                    return  res.json(urlInfo);
                }
                
            }
        } catch (error) {
            //console.log(error);
              res.status(500).json({message:"An error occured while generating a shortened link", error});  
        }
        
    } else {
        res.status(401).json("Invalid url!");
    }
}
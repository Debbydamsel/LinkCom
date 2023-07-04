import express, {Request, Response} from "express";
import {Link, ILinks} from "../model/linkSchema";
import "dotenv/config";
const redirectRoute = express.Router();
const token: string = process.env.SECRET_KEY as string;



redirectRoute.get("/:linkId", async(req: Request, res: Response) => {

    try {

        //const token = req.cookies.jwt;
        

        const getUrl = await Link.findOne({ urlId: req.params.linkId });
        if (getUrl) {
            await getUrl.updateOne({ urlId: req.params.linkId }, {$inc: { clicks: 1 }});
            const expiryDate = 3 * 24 * 60* 60 * 1000;
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: expiryDate,
                sameSite: "none",
                secure: true
            });
            return res.redirect(getUrl.longLink);
           
        } else {
            res.status(404).json("Url not found!");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
    

})

export default redirectRoute;
import express, {Request, Response} from "express";
import {Link, ILinks} from "../model/linkSchema";
import "dotenv/config";
const redirectRoute = express.Router();



redirectRoute.get("/:linkId", async(req: Request, res: Response) => {

    try {
        
        const getUrl = await Link.findOne({ urlId: req.params.linkId });
        if (getUrl) {
            await getUrl.updateOne({ urlId: req.params.linkId }, {$inc: { clicks: 1 }});
            return res.redirect(getUrl.longLink);
        } else {
            res.status(404).json("Url not found!");
        }

    } catch (error) {
        //console.log(error);
        res.status(500).json("Server error");
    }
    

})

export default redirectRoute;
import express from "express";
const linkRoute = express.Router();
import cookieParser from "cookie-parser";
import { getShortenedUrl, getUrlPage } from "../controllers/linkController";
linkRoute.use(cookieParser());

//render the shorten url page
linkRoute.get("/getAuthPage", getUrlPage);

//generate a shortened url
linkRoute.post("/getAuthPage", getShortenedUrl);

export default linkRoute ;


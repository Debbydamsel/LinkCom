import express, {Application, Request, Response, NextFunction} from "express"
import cookieParser from "cookie-parser";
import connectToDb from "./dbConnection/connectToDb";
import "dotenv/config";
import path from "path";
//import cors from "cors";

import linkRoute  from "./routes/linkRoute";
import redirectRoute from "./routes/redirectLink";
import userRoute from "./routes/userRoute";
import { auth } from "./middlewares/auth";

const app: Application = express();
const port = process.env.PORT;
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }
 
// app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//connection to mongodb
connectToDb();

app.use("/api/url", auth, linkRoute);
app.use("/", redirectRoute);
app.use("/users", userRoute);

app.get("/", (req: Request, res: Response) => {
    res.render("heroSection");
   
});



app.post("/", (req: Request, res: Response) => {
    const inputLink  = req.body.input;
    console.log(inputLink);

    //res.redirect("/");
})


app.all("*", (req: Request, res: Response) => {
    res.status(404).json(`This endpoint ${req.originalUrl} is not found on this server!, check the endpoint and try again.`);
})

app.listen(port, () => {
    console.log(`port running on port:${port}`);
})
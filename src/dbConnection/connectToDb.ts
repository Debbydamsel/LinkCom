//require("dotenv").config();
//import "dotenv/config";
//import dotenv from "dotenv"
// dotenv.config();
import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";

const mongo_uri = process.env.MONGO_URI;

async function connectToDb() {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions

        await mongoose.connect(`${mongo_uri}`, options)
        console.log("connected to mongodb successfully");

    } catch (error) {
        console.log("error connecting to mongodb", error);
    }
}

export default connectToDb;
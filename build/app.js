"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectToDb_1 = __importDefault(require("./dbConnection/connectToDb"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const linkRoute_1 = __importDefault(require("./routes/linkRoute"));
const redirectLink_1 = __importDefault(require("./routes/redirectLink"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const auth_1 = require("./middlewares/auth");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set('views', path_1.default.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
//connection to mongodb
(0, connectToDb_1.default)();
app.use("/api/url", auth_1.auth, linkRoute_1.default);
app.use("/", redirectLink_1.default);
app.use("/users", userRoute_1.default);
app.get("/", (req, res) => {
    res.render("heroSection");
});
app.post("/", (req, res) => {
    const inputLink = req.body.input;
    console.log(inputLink);
    //res.redirect("/");
});
app.all("*", (req, res) => {
    res.status(404).json(`This endpoint ${req.originalUrl} is not found on this server!, check the endpoint and try again.`);
});
app.listen(port, () => {
    console.log(`port running on port:${port}`);
});

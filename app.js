import { DefaultErrorHandler, NotFoundError } from "./utilities/ErrorHandler.js"
import express from "express";
const app = express();
import router from "./routes/api.js"
import { DATABASE, MAX_JSON_SIZE, REQUEST_NUMBER, REQUEST_TIME, SECRET_KEY, URL_ENCODE, WEB_CACHE } from "./configs/configs.js";
import mongoose from "mongoose";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

// app.use(xss());
app.use(cookieParser());
app.use(cors({
    credential:true,
    origin:SECRET_KEY
}))
app.use(hpp());
app.use(helmet());
const limiter = rateLimit({windowMs: REQUEST_TIME, limit: REQUEST_NUMBER});
app.use(limiter);
app.use(bodyParser.urlencoded({extended:URL_ENCODE}));
app.use(express.json({Limit:MAX_JSON_SIZE}));
app.use(express.static("public"));
app.set("eTag",WEB_CACHE);

//for express fileUpload
app.use(fileUpload());
app.use("/uploads",express.static("uploadedFiles"));//toReadFileDirectly

mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("DATABASE CONNECTED");
}).catch((error)=>{
    console.log(error.message);
})

app.use("/api",router);
//Not Found Error Handler
app.use(NotFoundError);

// Default Error Handler
app.use(DefaultErrorHandler);

export default app;
import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import logger from "./logger";
import fs from "fs";
import errorHandler from "@middlewares/error.handler";
import indexRouter from "@routes/index.route";

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

dotenv.config();

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: {
        write: (message: string) => logger.info(message.trim())
    }
}));
app.use("/api", indexRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
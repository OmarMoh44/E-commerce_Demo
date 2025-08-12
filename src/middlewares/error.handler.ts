import { ErrorBody } from "@models/errorBody";
import logger from "@src/logger";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(`Error in ${req.method} ${req.url} - ${err.message}`, { stack: err.stack });
    const statusCode = err.status ? err.status : 500;

    const body: ErrorBody = {
        success: false,
        message: err.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };
    res.status(statusCode).json(body);
}

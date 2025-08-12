import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import logger from "@src/logger";

export const buyerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Checking buyer permissions for user ${req.userId}`);
    if (req.userRole !== Role.Buyer) {
        logger.warn(`Unauthorized access attempt by user ${req.userId}`);
        res.status(403).json({
            status: "failed",
            message: "Forbidden. You are not a buyer.",
        });
    }
    next();
};

export const sellerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Checking seller permissions for user ${req.userId}`);
    if (req.userRole !== Role.Seller) {
        logger.warn(`Unauthorized access attempt by user ${req.userId}`);
        res.status(403).json({
            status: "failed",
            message: "Forbidden. You are not a seller.",
        });
    }
    next();
};

import logger from "@src/logger";
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = getToken(req);
        const { id, role } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as Record<string, any>;
        if (!id || !role) throw new Error("Id and role are not present in token");
        req.userId = id;
        req.userRole = role as string;
        logger.info(`Authenticating user ${req.userId}`);
        next();
    } catch (e: any) {
        logger.error(`Error in ${req.method} ${req.url} - ${e.message}`, { stack: e.stack });
        let message: string;
        if (e instanceof TokenExpiredError) {
            message = "Token expired";
        } else {
            message = "Unauthorized access";
        }
        res.status(401).json({
            status: "failed",
            message,
        });
    }
};

function getToken(req: Request) {
    if (req.cookies.token) {
        return req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        return req.headers.authorization.replace("Bearer", "").trim();
    } else {
        throw new Error("Token is not found");
    }
}

export default userAuth;

import winston from "winston";
import path from "path";

const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }), // capture stack traces
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join("logs", "requests.log"),
            level: "info"
        }),
        new winston.transports.File({
            filename: path.join("logs", "errors.log"),
            level: "error"
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: path.join("logs", "exceptions.log") })
    ]
});

export default logger;

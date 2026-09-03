import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { env } from "./env";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level} : ${stack || message}]`;
  }),
);

const prodFormat = combine(
    timestamp(),
    errors({stack:true}),
    json()
)

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

const fileRotateTransport =  new DailyRotateFile({
    filename:"logs/%DATE%-app.log",
    datePattern:"YYYY-MM-DD",
    maxFiles:"14d",
    maxSize:"20m",
    level:"info",
    format:fileFormat
})


const errorFileTransport = new DailyRotateFile({
    filename:"logs/%DATE%-error.log",
    datePattern:"YYYY-MM-DD",
    maxFiles:"30d",
    level:"error"
})

export const logger = winston.createLogger({
    level:env.isProd ? "info" : 'debug',
    format:env.isProd ? prodFormat : devFormat,
    transports:[
        new winston.transports.Console(),
        fileRotateTransport,
        errorFileTransport,
    ],
    exceptionHandlers:[new winston.transports.Console(),errorFileTransport],
    rejectionHandlers:[new winston.transports.Console(),errorFileTransport]
})
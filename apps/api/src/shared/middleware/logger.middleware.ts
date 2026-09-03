import { NextFunction, Request, Response } from "express";
import { logger } from "../../config/logger";
import { randomUUID } from "node:crypto";
import { UAParser } from "ua-parser-js";

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.id = (req.headers["x-request-id"] as string) || randomUUID();
  res.setHeader("x-request-id", req.id);
  const ua = new UAParser(req.headers["user-agent"]);
  const device = {
    browser: ua.getBrowser().name,
    browserVersion: ua.getBrowser().version,
    os: ua.getOS().name,
    osVersion: ua.getOS().version,
    deviceType: ua.getDevice().type || "desktop",
  };

  req.log = logger.child({ requestId: req.id, device });

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    req.log.info("request completed", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Math.round(durationMs),
      ip: req.ip,
    });
  });

  next();
}

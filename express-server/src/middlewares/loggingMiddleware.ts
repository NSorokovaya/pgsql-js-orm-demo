import { Request, Response, NextFunction } from "express";
import logger from "../logger";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = new Date().getTime();
  const { method, url, ip } = req;
  const userAgent = req.headers["user-agent"] || "-";

  res.on("finish", () => {
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    const { statusCode } = res;
    logger.info(
      `${method} ${url} ${statusCode} ${responseTime}ms - ${ip} - ${userAgent}`
    );
  });

  next();
};

import { Request, Response } from "express";
import * as logger from "firebase-functions/logger";
import { RequestMetadata, ResponseMetadata } from "./types";

// Generate unique request ID
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Analytics and tracking middleware
export function analyticsMiddleware(
  req: Request,
  res: Response,
  next: () => void
) {
  const startTime = Date.now();
  const requestId = generateRequestId();
  const endpoint = req.url;
  const method = req.method;

  // Add metadata to request object
  (req as any).metadata = {
    startTime,
    requestId,
    endpoint,
    method,
  } as RequestMetadata;

  // Log request start
  logger.info("Request started", {
    requestId,
    endpoint,
    method,
    timestamp: new Date().toISOString(),
  });

  // Override response.json to add metadata
  const originalJson = res.json;
  res.json = function (body: any) {
    const endTime = Date.now();
    const latency = endTime - startTime;

    // Create response metadata
    const responseMetadata: ResponseMetadata = {
      latency,
      timestamp: new Date().toISOString(),
      requestId,
      status: res.statusCode,
    };

    // Log completion
    logger.info("Request completed", {
      ...responseMetadata,
      endpoint,
      method,
    });

    // Add metadata to response if it's a success response
    if (body && typeof body === "object" && body.success !== false) {
      body.metadata = responseMetadata;
    }

    return originalJson.call(this, body);
  };

  next();
}

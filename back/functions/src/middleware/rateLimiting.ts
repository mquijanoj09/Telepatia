import { Request, Response } from "express";
import * as logger from "firebase-functions/logger";

// Simple in-memory rate limiting (for more robust solution, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Rate limiting middleware
export function rateLimitMiddleware(
  maxRequests: number = 100, // requests per window
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  return (req: Request, res: Response, next: () => void) => {
    const clientIp = req.ip || req.connection.remoteAddress || "unknown";
    const now = Date.now();

    // Clean up expired entries
    for (const [ip, data] of requestCounts.entries()) {
      if (now > data.resetTime) {
        requestCounts.delete(ip);
      }
    }

    // Get or create client entry
    const clientData = requestCounts.get(clientIp) || {
      count: 0,
      resetTime: now + windowMs,
    };

    // Check if rate limit exceeded
    if (clientData.count >= maxRequests) {
      logger.warn("Rate limit exceeded", {
        clientIp,
        count: clientData.count,
        limit: maxRequests,
      });

      res.status(429).json({
        success: false,
        error: "Rate limit exceeded",
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Increment counter
    clientData.count++;
    requestCounts.set(clientIp, clientData);

    // Add rate limit headers
    res.set({
      "X-RateLimit-Limit": maxRequests.toString(),
      "X-RateLimit-Remaining": (maxRequests - clientData.count).toString(),
      "X-RateLimit-Reset": new Date(clientData.resetTime).toISOString(),
    });

    next();
  };
}

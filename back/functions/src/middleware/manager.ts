import { Request, Response } from "express";
import { corsMiddleware } from "./cors";
import { validateRequest } from "./validation";
import { analyticsMiddleware } from "./analytics";
import { errorHandler, asyncHandler } from "./errorHandler";
import { rateLimitMiddleware } from "./rateLimiting";

// Manager for combining middleware
export class MiddlewareManager {
  private middlewares: Array<
    (req: Request, res: Response, next: () => void) => void
  > = [];

  // Add core middleware that applies to all endpoints
  constructor() {
    this.middlewares.push(corsMiddleware);
    this.middlewares.push(analyticsMiddleware);
    this.middlewares.push(validateRequest);
  }

  // Add rate limiting middleware
  addRateLimit(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    this.middlewares.push(rateLimitMiddleware(maxRequests, windowMs));
    return this;
  }

  // Add custom validation middleware
  addValidation(
    validator: (req: Request, res: Response, next: () => void) => void
  ) {
    this.middlewares.push(validator);
    return this;
  }

  // Execute all middleware and then the handler
  async execute(
    req: Request,
    res: Response,
    handler: (req: Request, res: Response) => Promise<void>
  ) {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next);
      } else {
        // All middleware passed, execute the handler
        asyncHandler(handler)(req, res, (error: any) => {
          if (error) {
            errorHandler(error, req, res, () => {});
          }
        });
      }
    };

    next();
  }
}

// Factory function to create middleware manager
export function createMiddleware() {
  return new MiddlewareManager();
}

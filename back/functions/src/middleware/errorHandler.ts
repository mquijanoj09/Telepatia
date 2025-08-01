import { Request, Response } from "express";
import * as logger from "firebase-functions/logger";

// Centralized error handling middleware
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: () => void
) {
  const requestId = (req as any).metadata?.requestId || "unknown";
  const endpoint = req.url;

  // Log the error
  logger.error("Request failed", {
    error: error.message || error,
    requestId,
    endpoint,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });

  // Determine error status and message
  let status = 500;
  let message = "Internal server error";

  if (error.message) {
    if (error.message.includes("Transcription failed")) {
      status = 500;
      message = "Audio transcription failed";
    } else if (error.message.includes("Medical extraction failed")) {
      status = 500;
      message = "Medical information extraction failed";
    } else if (error.message.includes("Diagnosis generation failed")) {
      status = 500;
      message = "Diagnosis generation failed";
    } else if (error.message.includes("validation")) {
      status = 400;
      message = "Validation error";
    }
  }

  // Send standardized error response
  res.status(status).json({
    success: false,
    error: message,
    details: error.message,
    timestamp: new Date().toISOString(),
    requestId,
  });
}

// Async error wrapper
export function asyncHandler(
  fn: (req: Request, res: Response) => Promise<void>
) {
  return (req: Request, res: Response, next: (error?: any) => void) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
}

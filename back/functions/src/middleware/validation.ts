import { Request, Response } from "express";

// Basic request validation
export function validateRequest(req: Request, res: Response, next: () => void) {
  // Check if request method is POST
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      error: "Method not allowed. Use POST.",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Check if content-type is JSON for POST requests
  if (req.method === "POST" && !req.is("application/json")) {
    res.status(400).json({
      success: false,
      error: "Content-Type must be application/json",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}

// Validate specific endpoint requirements
export function validateMedicalConsultation(
  req: Request,
  res: Response,
  next: () => void
) {
  const { audioUrl, text } = req.body;

  if (!audioUrl && !text) {
    res.status(400).json({
      success: false,
      error: "Either audioUrl or text is required",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}

export function validateTranscription(
  req: Request,
  res: Response,
  next: () => void
) {
  const { audioUrl } = req.body;

  if (!audioUrl) {
    res.status(400).json({
      success: false,
      error: "audioUrl is required",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}

export function validateExtraction(
  req: Request,
  res: Response,
  next: () => void
) {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({
      success: false,
      error: "text is required",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}

export function validateDiagnosis(
  req: Request,
  res: Response,
  next: () => void
) {
  const { extractedInfo, originalText } = req.body;

  if (!extractedInfo || !originalText) {
    res.status(400).json({
      success: false,
      error: "extractedInfo and originalText are required",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
}

// Decorators for Cloud Functions
import { onRequest } from "firebase-functions/https";
import { createMiddleware } from "./manager";
import {
  validateMedicalConsultation,
  validateTranscription,
  validateExtraction,
  validateDiagnosis,
} from "./validation";

// Decorator for medical consultation endpoint
export function medicalConsultationEndpoint(
  handler: (req: any, res: any) => Promise<void>
) {
  return onRequest(async (req, res) => {
    const middleware = createMiddleware().addValidation(
      validateMedicalConsultation
    );
    await middleware.execute(req, res, handler);
  });
}

// Decorator for transcription endpoint
export function transcriptionEndpoint(
  handler: (req: any, res: any) => Promise<void>
) {
  return onRequest(async (req, res) => {
    const middleware = createMiddleware().addValidation(validateTranscription);
    await middleware.execute(req, res, handler);
  });
}

// Decorator for extraction endpoint
export function extractionEndpoint(
  handler: (req: any, res: any) => Promise<void>
) {
  return onRequest(async (req, res) => {
    const middleware = createMiddleware().addValidation(validateExtraction);
    await middleware.execute(req, res, handler);
  });
}

// Decorator for diagnosis endpoint
export function diagnosisEndpoint(
  handler: (req: any, res: any) => Promise<void>
) {
  return onRequest(async (req, res) => {
    const middleware = createMiddleware().addValidation(validateDiagnosis);
    await middleware.execute(req, res, handler);
  });
}

// Generic endpoint decorator
export function apiEndpoint(handler: (req: any, res: any) => Promise<void>) {
  return onRequest(async (req, res) => {
    const middleware = createMiddleware();
    await middleware.execute(req, res, handler);
  });
}

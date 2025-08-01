import { Request, Response } from "express";

// Helper function to set CORS headers
export function setCorsHeaders(response: Response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

// Helper function to handle preflight requests
export function handlePreflight(request: Request, response: Response): boolean {
  if (request.method === "OPTIONS") {
    setCorsHeaders(response);
    response.status(204).send("");
    return true;
  }
  return false;
}

// CORS middleware
export function corsMiddleware(req: Request, res: Response, next: () => void) {
  setCorsHeaders(res);

  if (handlePreflight(req, res)) {
    return;
  }

  next();
}

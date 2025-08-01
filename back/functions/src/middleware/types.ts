import { Request } from "firebase-functions/https";
import { Response } from "express";

export interface RequestMetadata {
  startTime: number;
  requestId: string;
  endpoint: string;
  method: string;
}

export interface ResponseMetadata {
  latency: number;
  timestamp: string;
  requestId: string;
  status: number;
}

export type HandlerFunction = (req: Request, res: Response) => Promise<void>;

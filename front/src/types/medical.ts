// Types for medical data
export interface PatientInfo {
  name?: string;
  age?: number;
  id?: string;
  gender?: string;
}

export interface MedicalExtraction {
  symptoms: string[];
  patient: PatientInfo;
  consultationReason: string;
}

export interface DiagnosisResult {
  diagnosis: string;
  treatment: string;
  recommendations: string;
  fullReport: string;
}

export interface ConsultationResult {
  transcription: string;
  extractedInfo: MedicalExtraction;
  diagnosis: DiagnosisResult;
}

export interface ApiResponse {
  success: boolean;
  result: ConsultationResult;
  processedAt: string;
}

export type InputType = "text" | "audio";

// Simplified types for transcription only
export interface TranscriptionResult {
  transcription: string;
}

export interface TranscriptionResponse {
  success: boolean;
  result: TranscriptionResult;
  processedAt: string;
}

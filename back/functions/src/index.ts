/**
 * Medical AI Chain Functions
 *
 * Chain of three functions:
 * 1. Audio transcription (Speech-to-Text)
 * 2. Medical information extraction (LLM)
 * 3. Diagnosis generation (LLM)
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
setGlobalOptions({ maxInstances: 10 });

// Types for structured medical data
interface PatientInfo {
  name?: string;
  age?: number;
  id?: string;
  gender?: string;
}

interface MedicalExtraction {
  symptoms: string[];
  patient: PatientInfo;
  consultationReason: string;
}

interface DiagnosisResult {
  diagnosis: string;
  treatment: string;
  recommendations: string;
  fullReport: string;
}

// Helper function to set CORS headers
function setCorsHeaders(response: any) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

// Helper function to handle preflight requests
function handlePreflight(request: any, response: any): boolean {
  if (request.method === "OPTIONS") {
    setCorsHeaders(response);
    response.status(204).send("");
    return true;
  }
  return false;
}

/**
 * Function 1: Audio Transcription
 * Receives an audio URL and transcribes it to text
 */
export const transcribeAudio = onRequest(async (request, response) => {
  setCorsHeaders(response);

  if (handlePreflight(request, response)) return;

  try {
    logger.info("Audio transcription started", { structuredData: true });

    // Validate request
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { audioUrl } = request.body;

    if (!audioUrl) {
      response.status(400).json({ error: "audioUrl is required" });
      return;
    }

    // TODO: Implement actual audio transcription
    // For now, we'll simulate the transcription
    // In real implementation, you would use:
    // - Google Speech-to-Text API
    // - OpenAI Whisper API
    // - Azure Speech Services

    const mockTranscription =
      "Patient John Doe, 35 years old, ID 12345678. Presents with fever, headache, and sore throat for the past 3 days. Temperature 38.5°C. Patient reports difficulty swallowing and fatigue. No recent travel history. Seeking consultation for possible viral infection.";

    logger.info("Audio transcription completed", {
      audioUrl,
      transcriptionLength: mockTranscription.length,
      structuredData: true,
    });

    response.json({
      success: true,
      transcription: mockTranscription,
      audioUrl,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Audio transcription failed", { error: errorMessage });
    response.status(500).json({
      error: "Transcription failed",
      details: errorMessage,
    });
  }
});

/**
 * Function 2: Medical Information Extraction
 * Processes text and extracts structured medical information
 */
export const extractMedicalInfo = onRequest(async (request, response) => {
  setCorsHeaders(response);

  if (handlePreflight(request, response)) return;

  try {
    logger.info("Medical information extraction started", {
      structuredData: true,
    });

    // Validate request
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { text } = request.body;

    if (!text) {
      response.status(400).json({ error: "text is required" });
      return;
    }

    // TODO: Implement actual LLM extraction
    // For now, we'll simulate the extraction
    // In real implementation, you would use:
    // - OpenAI GPT API with structured outputs
    // - Google Gemini API
    // - Anthropic Claude API

    const extractedInfo: MedicalExtraction = {
      symptoms: [
        "fever",
        "headache",
        "sore throat",
        "difficulty swallowing",
        "fatigue",
      ],
      patient: {
        name: "John Doe",
        age: 35,
        id: "12345678",
        gender: "male",
      },
      consultationReason:
        "Possible viral infection with fever, headache, and throat symptoms lasting 3 days",
    };

    logger.info("Medical information extraction completed", {
      textLength: text.length,
      symptomsCount: extractedInfo.symptoms.length,
      structuredData: true,
    });

    response.json({
      success: true,
      extractedInfo,
      originalText: text,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Medical information extraction failed", {
      error: errorMessage,
    });
    response.status(500).json({
      error: "Medical extraction failed",
      details: errorMessage,
    });
  }
});

/**
 * Function 3: Diagnosis Generation
 * Generates diagnosis, treatment, and recommendations from structured medical data
 */
export const generateDiagnosis = onRequest(async (request, response) => {
  setCorsHeaders(response);

  if (handlePreflight(request, response)) return;

  try {
    logger.info("Diagnosis generation started", { structuredData: true });

    // Validate request
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { medicalInfo } = request.body;

    if (!medicalInfo) {
      response.status(400).json({ error: "medicalInfo is required" });
      return;
    }

    // TODO: Implement actual LLM diagnosis generation
    // For now, we'll simulate the diagnosis
    // In real implementation, you would use:
    // - OpenAI GPT API for medical reasoning
    // - Google Gemini Pro for diagnosis generation
    // - Custom medical AI models

    const diagnosisResult: DiagnosisResult = {
      diagnosis:
        "Viral upper respiratory tract infection (common cold/flu-like syndrome)",
      treatment:
        "Supportive care: Rest, increased fluid intake, acetaminophen or ibuprofen for fever and pain relief. Warm saltwater gargles for sore throat.",
      recommendations:
        "Monitor temperature, return if symptoms worsen or persist beyond 7-10 days. Seek immediate care if difficulty breathing, severe throat pain preventing swallowing, or high fever >39°C persists.",
      fullReport: `MEDICAL REPORT

Patient: ${medicalInfo.patient?.name || "Unknown"} (Age: ${
        medicalInfo.patient?.age || "Unknown"
      })
ID: ${medicalInfo.patient?.id || "Unknown"}

CONSULTATION REASON:
${medicalInfo.consultationReason}

SYMPTOMS:
${medicalInfo.symptoms?.join(", ") || "None reported"}

DIAGNOSIS:
Viral upper respiratory tract infection (common cold/flu-like syndrome)

TREATMENT PLAN:
1. Supportive care with adequate rest
2. Increased fluid intake (water, warm teas, broths)
3. Acetaminophen 500mg every 6-8 hours for fever/pain (max 3g/day)
4. Ibuprofen 400mg every 6-8 hours as alternative for pain/fever
5. Warm saltwater gargles 3-4 times daily for throat symptoms

RECOMMENDATIONS:
- Continue current treatment regimen
- Monitor body temperature regularly
- Return for follow-up if symptoms worsen or persist beyond 7-10 days
- Seek immediate medical attention if experiencing:
  * Difficulty breathing or shortness of breath
  * Severe throat pain preventing swallowing
  * High fever >39°C (102.2°F) persisting >48 hours
  * Signs of dehydration

Generated on: ${new Date().toISOString()}`,
    };

    logger.info("Diagnosis generation completed", {
      patientName: medicalInfo.patient?.name,
      symptomsCount: medicalInfo.symptoms?.length || 0,
      structuredData: true,
    });

    response.json({
      success: true,
      diagnosis: diagnosisResult,
      inputData: medicalInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Diagnosis generation failed", { error: errorMessage });
    response.status(500).json({
      error: "Diagnosis generation failed",
      details: errorMessage,
    });
  }
});

/**
 * Function 4: Complete Medical Chain
 * Orchestrates the entire process from audio to diagnosis
 */
export const processCompleteConsultation = onRequest(
  async (request, response) => {
    setCorsHeaders(response);

    if (handlePreflight(request, response)) return;

    try {
      logger.info("Complete medical consultation started", {
        structuredData: true,
      });

      // Validate request
      if (request.method !== "POST") {
        response.status(405).json({ error: "Method not allowed. Use POST." });
        return;
      }

      const { audioUrl, text } = request.body;

      if (!audioUrl && !text) {
        response
          .status(400)
          .json({ error: "Either audioUrl or text is required" });
        return;
      }

      let transcription = text;

      // Step 1: Transcribe audio if provided
      if (audioUrl && !text) {
        // In real implementation, call the transcription service
        transcription =
          "Patient John Doe, 35 years old, ID 12345678. Presents with fever, headache, and sore throat for the past 3 days. Temperature 38.5°C. Patient reports difficulty swallowing and fatigue. No recent travel history. Seeking consultation for possible viral infection.";
      }

      // Step 2: Extract medical information
      const extractedInfo: MedicalExtraction = {
        symptoms: [
          "fever",
          "headache",
          "sore throat",
          "difficulty swallowing",
          "fatigue",
        ],
        patient: {
          name: "John Doe",
          age: 35,
          id: "12345678",
          gender: "male",
        },
        consultationReason:
          "Possible viral infection with fever, headache, and throat symptoms lasting 3 days",
      };

      // Step 3: Generate diagnosis
      const diagnosis =
        "Viral upper respiratory tract infection (common cold/flu-like syndrome)";
      const treatment =
        "Supportive care: Rest, increased fluid intake, acetaminophen or ibuprofen for fever and pain relief. Warm saltwater gargles for sore throat.";
      const recommendations =
        "Monitor temperature, return if symptoms worsen or persist beyond 7-10 days. Seek immediate care if difficulty breathing, severe throat pain preventing swallowing, or high fever >39°C persists.";

      const diagnosisResult: DiagnosisResult = {
        diagnosis,
        treatment,
        recommendations,
        fullReport: `COMPLETE MEDICAL CONSULTATION REPORT

Patient: ${extractedInfo.patient?.name || "Unknown"} (Age: ${
          extractedInfo.patient?.age || "Unknown"
        })
ID: ${extractedInfo.patient?.id || "Unknown"}

ORIGINAL INPUT: ${audioUrl ? "Audio transcription" : "Text input"}
TRANSCRIPTION: ${transcription}

CONSULTATION REASON:
${extractedInfo.consultationReason}

SYMPTOMS IDENTIFIED:
${extractedInfo.symptoms?.join(", ") || "None reported"}

MEDICAL ASSESSMENT:
Diagnosis: ${diagnosis}

TREATMENT PLAN:
${treatment}

RECOMMENDATIONS:
${recommendations}

Report generated: ${new Date().toISOString()}`,
      };

      logger.info("Complete medical consultation completed", {
        hasAudio: !!audioUrl,
        hasText: !!text,
        patientName: extractedInfo.patient?.name,
        structuredData: true,
      });

      response.json({
        success: true,
        result: {
          transcription,
          extractedInfo,
          diagnosis: diagnosisResult,
        },
        processedAt: new Date().toISOString(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      logger.error("Complete medical consultation failed", {
        error: errorMessage,
      });
      response.status(500).json({
        error: "Complete consultation failed",
        details: errorMessage,
      });
    }
  }
);

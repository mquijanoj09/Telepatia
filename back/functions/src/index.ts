/**
 * Medical AI Chain Functions
 *
 * Chain of three functions:
 * 1. Audio transcription (Speech-to-Text) - OpenAI Whisper
 * 2. Medical information extraction (LLM) - OpenAI GPT
 * 3. Diagnosis generation (LLM) - OpenAI GPT
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import OpenAI from "openai";
import { defineString } from "firebase-functions/params";

// Define the OpenAI API key parameter
const openaiApiKey = defineString("OPENAI_API_KEY");

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
setGlobalOptions({ maxInstances: 10 });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiApiKey.value(), // Use the parameter value
});

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
 * Step 1: Transcribe audio using OpenAI Whisper
 */
async function transcribeAudioWithWhisper(audioUrl: string): Promise<string> {
  try {
    logger.info("Starting audio transcription with Whisper", { audioUrl });

    // Download the audio file
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to download audio: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioFile = new File([audioBuffer], "audio.mp3", {
      type: "audio/mpeg",
    });

    // Transcribe with Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "es", // Spanish - adjust as needed
      prompt:
        "Esta es una consulta médica. El paciente describe sus síntomas al doctor.",
    });

    logger.info("Audio transcription completed", {
      transcriptionLength: transcription.text.length,
    });

    return transcription.text;
  } catch (error) {
    logger.error("Audio transcription failed", { error });
    throw new Error(
      `Transcription failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Step 2: Extract medical information using OpenAI GPT
 */
async function extractMedicalInfoWithGPT(
  text: string
): Promise<MedicalExtraction> {
  try {
    logger.info("Starting medical information extraction", {
      textLength: text.length,
    });

    const prompt = `Analyze the following medical consultation text and extract structured information. Return a JSON object with the following structure:

{
  "symptoms": ["symptom1", "symptom2", ...],
  "patient": {
    "name": "patient name if mentioned",
    "age": number or null,
    "id": "patient ID if mentioned",
    "gender": "male/female/other or null"
  },
  "consultationReason": "brief summary of why the patient is seeking consultation"
}

Medical consultation text:
${text}

Please extract only the information explicitly mentioned in the text. If information is not available, use null for optional fields.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a medical information extraction specialist. Extract structured data from medical consultations and return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const extractedText = completion.choices[0]?.message?.content;
    if (!extractedText) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    const extractedInfo = JSON.parse(extractedText) as MedicalExtraction;

    logger.info("Medical information extraction completed", {
      symptomsCount: extractedInfo.symptoms?.length || 0,
      hasPatientInfo: !!extractedInfo.patient,
    });

    return extractedInfo;
  } catch (error) {
    logger.error("Medical information extraction failed", { error });
    throw new Error(
      `Medical extraction failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Step 3: Generate diagnosis and treatment using OpenAI GPT
 */
async function generateDiagnosisWithGPT(
  extractedInfo: MedicalExtraction,
  originalText: string
): Promise<DiagnosisResult> {
  try {
    logger.info("Starting diagnosis generation", {
      symptomsCount: extractedInfo.symptoms?.length || 0,
    });

    const prompt = `Based on the following medical information extracted from a patient consultation, provide a medical assessment. Return a JSON object with this structure:

{
  "diagnosis": "primary diagnosis based on symptoms",
  "treatment": "recommended treatment plan",
  "recommendations": "additional recommendations and follow-up instructions",
  "fullReport": "complete detailed medical report"
}

Patient Information:
- Name: ${extractedInfo.patient?.name || "Not specified"}
- Age: ${extractedInfo.patient?.age || "Not specified"}
- Gender: ${extractedInfo.patient?.gender || "Not specified"}
- ID: ${extractedInfo.patient?.id || "Not specified"}

Consultation Reason: ${extractedInfo.consultationReason}

Symptoms: ${extractedInfo.symptoms?.join(", ") || "None specified"}

Original consultation text:
${originalText}

Please provide a thorough but concise medical assessment. Include appropriate disclaimers about seeking professional medical care.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an experienced medical AI assistant. Provide thorough medical assessments based on patient symptoms and information. Always recommend consulting with healthcare professionals for definitive diagnosis and treatment. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    });

    const diagnosisText = completion.choices[0]?.message?.content;
    if (!diagnosisText) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    const diagnosisResult = JSON.parse(diagnosisText) as DiagnosisResult;

    logger.info("Diagnosis generation completed", {
      diagnosisLength: diagnosisResult.diagnosis?.length || 0,
    });

    return diagnosisResult;
  } catch (error) {
    logger.error("Diagnosis generation failed", { error });
    throw new Error(
      `Diagnosis generation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Complete Medical Chain
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
        logger.info("Processing audio transcription", { audioUrl });
        transcription = await transcribeAudioWithWhisper(audioUrl);
      }

      // Use provided text or transcribed audio
      const inputText = transcription;

      // Step 2: Extract medical information using OpenAI
      logger.info("Extracting medical information", {
        inputLength: inputText.length,
      });
      const extractedInfo = await extractMedicalInfoWithGPT(inputText);

      // Step 3: Generate diagnosis using OpenAI
      logger.info("Generating diagnosis", {
        symptomsCount: extractedInfo.symptoms?.length || 0,
      });
      const diagnosisResult = await generateDiagnosisWithGPT(
        extractedInfo,
        inputText
      );

      logger.info("Complete medical consultation completed", {
        hasAudio: !!audioUrl,
        hasText: !!text,
        patientName: extractedInfo.patient?.name,
        diagnosisGenerated: !!diagnosisResult.diagnosis,
        structuredData: true,
      });

      response.json({
        success: true,
        result: {
          transcription: inputText,
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

/**
 * Individual function: Audio Transcription
 */
export const transcribeAudio = onRequest(async (request, response) => {
  setCorsHeaders(response);
  if (handlePreflight(request, response)) return;

  try {
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { audioUrl } = request.body;
    if (!audioUrl) {
      response.status(400).json({ error: "audioUrl is required" });
      return;
    }

    const transcription = await transcribeAudioWithWhisper(audioUrl);

    response.json({
      success: true,
      result: { transcription },
      processedAt: new Date().toISOString(),
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
 * Individual function: Medical Information Extraction
 */
export const extractMedicalInfo = onRequest(async (request, response) => {
  setCorsHeaders(response);
  if (handlePreflight(request, response)) return;

  try {
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { text } = request.body;
    if (!text) {
      response.status(400).json({ error: "text is required" });
      return;
    }

    const extractedInfo = await extractMedicalInfoWithGPT(text);

    response.json({
      success: true,
      result: { extractedInfo },
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    logger.error("Medical extraction failed", { error: errorMessage });
    response.status(500).json({
      error: "Medical extraction failed",
      details: errorMessage,
    });
  }
});

/**
 * Individual function: Diagnosis Generation
 */
export const generateDiagnosis = onRequest(async (request, response) => {
  setCorsHeaders(response);
  if (handlePreflight(request, response)) return;

  try {
    if (request.method !== "POST") {
      response.status(405).json({ error: "Method not allowed. Use POST." });
      return;
    }

    const { extractedInfo, originalText } = request.body;
    if (!extractedInfo || !originalText) {
      response.status(400).json({
        error: "extractedInfo and originalText are required",
      });
      return;
    }

    const diagnosisResult = await generateDiagnosisWithGPT(
      extractedInfo,
      originalText
    );

    response.json({
      success: true,
      result: { diagnosis: diagnosisResult },
      processedAt: new Date().toISOString(),
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

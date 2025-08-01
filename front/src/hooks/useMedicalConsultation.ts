import { useState } from "react";
import { medicalService } from "../services/medicalService";
import type { ConsultationResult, InputType } from "../types/medical";

export const useMedicalConsultation = () => {
  const [inputType, setInputType] = useState<InputType>("text");
  const [textInput, setTextInput] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processConsultation = async () => {
    if (!textInput.trim() && !audioUrl.trim()) {
      setError("Please provide either text or audio URL");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await medicalService.processCompleteConsultation(
        inputType,
        textInput,
        audioUrl
      );

      if (response.success) {
        setResult(response.result);
      } else {
        setError("Failed to process consultation");
      }
    } catch (err) {
      console.error("Error processing consultation:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing your consultation"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTextInput("");
    setAudioUrl("");
    setResult(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processConsultation();
  };

  return {
    // State
    inputType,
    textInput,
    audioUrl,
    loading,
    result,
    error,
    // Actions
    setInputType,
    setTextInput,
    setAudioUrl,
    handleSubmit,
    resetForm,
  };
};

import axios from "axios";
import { API_BASE_URL } from "../config/api";
import type { ApiResponse, InputType } from "../types/medical";

export const medicalService = {
  async processCompleteConsultation(
    inputType: InputType,
    textInput: string,
    audioUrl: string
  ): Promise<ApiResponse> {
    const payload =
      inputType === "text" ? { text: textInput } : { audioUrl: audioUrl };

    const response = await axios.post<ApiResponse>(
      API_BASE_URL, // Direct function URL, no path needed
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },
};

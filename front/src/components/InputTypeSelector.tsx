import { Upload, FileText } from "lucide-react";
import type { InputType } from "../types/medical";

interface InputTypeSelectorProps {
  inputType: InputType;
  onInputTypeChange: (type: InputType) => void;
  disabled?: boolean;
}

export const InputTypeSelector = ({
  inputType,
  onInputTypeChange,
  disabled = false,
}: InputTypeSelectorProps) => {
  return (
    <div className="flex mb-6">
      <button
        type="button"
        onClick={() => onInputTypeChange("text")}
        disabled={disabled}
        className={`flex-1 py-3 px-4 rounded-l-lg border border-r-0 transition-colors ${
          inputType === "text"
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <FileText className="h-5 w-5 inline mr-2" />
        Text Input
      </button>
      <button
        type="button"
        onClick={() => onInputTypeChange("audio")}
        disabled={disabled}
        className={`flex-1 py-3 px-4 rounded-r-lg border border-l-0 transition-colors ${
          inputType === "audio"
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Upload className="h-5 w-5 inline mr-2" />
        Audio URL
      </button>
    </div>
  );
};

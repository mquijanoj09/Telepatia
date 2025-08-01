import { FileText } from "lucide-react";
import { InputTypeSelector } from "./InputTypeSelector";
import { TextInput } from "./TextInput";
import { AudioInput } from "./AudioInput";
import { ErrorMessage } from "./ErrorMessage";
import { ActionButtons } from "./ActionButtons";
import type { InputType } from "../types/medical";

interface MedicalFormProps {
  inputType: InputType;
  textInput: string;
  audioUrl: string;
  loading: boolean;
  error: string | null;
  onInputTypeChange: (type: InputType) => void;
  onTextInputChange: (value: string) => void;
  onAudioUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const MedicalForm = ({
  inputType,
  textInput,
  audioUrl,
  loading,
  error,
  onInputTypeChange,
  onTextInputChange,
  onAudioUrlChange,
  onSubmit,
  onReset,
}: MedicalFormProps) => {
  const isFormDisabled = loading || (!textInput.trim() && !audioUrl.trim());

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FileText className="h-6 w-6 mr-2 text-indigo-600" />
        Medical Consultation Input
      </h2>

      <InputTypeSelector
        inputType={inputType}
        onInputTypeChange={onInputTypeChange}
        disabled={loading}
      />

      <form onSubmit={onSubmit}>
        {inputType === "text" ? (
          <TextInput
            value={textInput}
            onChange={onTextInputChange}
            disabled={loading}
          />
        ) : (
          <AudioInput
            value={audioUrl}
            onChange={onAudioUrlChange}
            disabled={loading}
          />
        )}

        {error && <ErrorMessage message={error} />}

        <ActionButtons
          onSubmit={() => {}}
          onReset={onReset}
          loading={loading}
          disabled={isFormDisabled}
        />
      </form>
    </div>
  );
};

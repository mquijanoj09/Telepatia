interface AudioInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const AudioInput = ({
  value,
  onChange,
  disabled = false,
}: AudioInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Audio File URL
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/patient-consultation.mp3"
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        disabled={disabled}
      />
      <p className="text-sm text-gray-500 mt-2">
        Supported formats: MP3, WAV, M4A
      </p>
    </div>
  );
};

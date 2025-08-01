interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const TextInput = ({
  value,
  onChange,
  disabled = false,
}: TextInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Medical Consultation Text
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter the patient consultation details... 
Example: Patient Maria Gonzalez, 28 years old, ID 87654321. Reports persistent cough, shortness of breath, and chest pain for 5 days. Temperature 37.8°C. No smoking history. Recently traveled internationally."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        disabled={disabled}
      />
    </div>
  );
};

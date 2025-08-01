interface SymptomsCardProps {
  symptoms: string[];
}

export const SymptomsCard = ({ symptoms }: SymptomsCardProps) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 className="font-semibold text-yellow-800 mb-2">
        Identified Symptoms
      </h3>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom, index) => (
          <span
            key={index}
            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
          >
            {symptom}
          </span>
        ))}
      </div>
    </div>
  );
};

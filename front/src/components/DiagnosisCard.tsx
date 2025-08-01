interface DiagnosisCardProps {
  diagnosis: string;
}

export const DiagnosisCard = ({ diagnosis }: DiagnosisCardProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="font-semibold text-red-800 mb-2">Diagnosis</h3>
      <p className="text-red-700 font-medium">{diagnosis}</p>
    </div>
  );
};

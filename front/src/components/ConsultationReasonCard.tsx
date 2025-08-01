interface ConsultationReasonCardProps {
  reason: string;
}

export const ConsultationReasonCard = ({
  reason,
}: ConsultationReasonCardProps) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <h3 className="font-semibold text-purple-800 mb-2">
        Consultation Reason
      </h3>
      <p className="text-purple-700">{reason}</p>
    </div>
  );
};

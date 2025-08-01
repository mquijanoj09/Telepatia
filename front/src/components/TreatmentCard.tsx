interface TreatmentCardProps {
  treatment: string;
}

export const TreatmentCard = ({ treatment }: TreatmentCardProps) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="font-semibold text-green-800 mb-2">Treatment Plan</h3>
      <p className="text-green-700">{treatment}</p>
    </div>
  );
};

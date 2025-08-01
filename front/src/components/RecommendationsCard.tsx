interface RecommendationsCardProps {
  recommendations: string;
}

export const RecommendationsCard = ({
  recommendations,
}: RecommendationsCardProps) => {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
      <h3 className="font-semibold text-indigo-800 mb-2">Recommendations</h3>
      <p className="text-indigo-700">{recommendations}</p>
    </div>
  );
};

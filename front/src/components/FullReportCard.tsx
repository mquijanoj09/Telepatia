interface FullReportCardProps {
  fullReport: string;
}

export const FullReportCard = ({ fullReport }: FullReportCardProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-2">
        Complete Medical Report
      </h3>
      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-4 rounded border overflow-x-auto">
        {fullReport}
      </pre>
    </div>
  );
};

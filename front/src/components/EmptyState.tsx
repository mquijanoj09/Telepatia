import { Activity } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">
        Enter medical consultation data to see AI analysis results
      </p>
    </div>
  );
};

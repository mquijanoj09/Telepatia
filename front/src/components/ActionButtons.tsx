import { Brain } from "lucide-react";

interface ActionButtonsProps {
  onSubmit: () => void;
  onReset: () => void;
  loading: boolean;
  disabled: boolean;
}

export const ActionButtons = ({
  onSubmit,
  onReset,
  loading,
  disabled,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        onClick={onSubmit}
        disabled={disabled}
        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <Brain className="h-5 w-5 mr-2" />
            Analyze Consultation
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={loading}
        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset
      </button>
    </div>
  );
};

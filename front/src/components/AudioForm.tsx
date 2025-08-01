import { Music, Upload, RefreshCw, AlertCircle } from "lucide-react";

interface AudioFormProps {
  audioUrl: string;
  loading: boolean;
  error: string | null;
  onAudioUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const AudioForm = ({
  audioUrl,
  loading,
  error,
  onAudioUrlChange,
  onSubmit,
  onReset,
}: AudioFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Music className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">
          Audio Transcription
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audio URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={audioUrl}
              onChange={(e) => onAudioUrlChange(e.target.value)}
              placeholder="https://drive.google.com/uc?id=YOUR_FILE_ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <Upload className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Upload audio to Google Drive and paste the public URL here
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading || !audioUrl.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Transcribing...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Music className="h-5 w-5 mr-2" />
                Transcribe Audio
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">How to use:</h3>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. Upload your audio file (MP3, WAV, etc.) to Google Drive</li>
          <li>2. Make it publicly accessible</li>
          <li>3. Copy the file ID from the share URL</li>
          <li>4. Use format: https://drive.google.com/uc?id=FILE_ID</li>
          <li>5. Paste the URL above and click "Transcribe Audio"</li>
        </ol>
      </div>
    </div>
  );
};

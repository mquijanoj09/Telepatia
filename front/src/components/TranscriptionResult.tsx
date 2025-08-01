import { FileText, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import type { TranscriptionResult as TranscriptionResultType } from "../types/medical";

interface TranscriptionResultProps {
  result: TranscriptionResultType | null;
  loading: boolean;
}

export const TranscriptionResult = ({
  result,
  loading,
}: TranscriptionResultProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (result?.transcription) {
      try {
        await navigator.clipboard.writeText(result.transcription);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Transcription Result
          </h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <p className="text-gray-600">Transcribing your audio...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Transcription Result
          </h2>
        </div>
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Upload an audio file to see the transcription here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Transcription Result
          </h2>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Copy transcription"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-gray-600 mr-1" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-3">Transcribed Text:</h3>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {result.transcription}
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>✅ Transcription completed successfully</p>
        <p>🎯 Language: Spanish (as configured)</p>
        <p>🤖 Powered by OpenAI Whisper</p>
      </div>
    </div>
  );
};

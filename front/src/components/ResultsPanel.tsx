import { CheckCircle, Brain } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { PatientInfoCard } from "./PatientInfoCard";
import { SymptomsCard } from "./SymptomsCard";
import { ConsultationReasonCard } from "./ConsultationReasonCard";
import { DiagnosisCard } from "./DiagnosisCard";
import { TreatmentCard } from "./TreatmentCard";
import { RecommendationsCard } from "./RecommendationsCard";
import { FullReportCard } from "./FullReportCard";
import type { ConsultationResult } from "../types/medical";

interface ResultsPanelProps {
  result: ConsultationResult | null;
  loading: boolean;
}

export const ResultsPanel = ({ result, loading }: ResultsPanelProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Brain className="h-6 w-6 mr-2 text-green-600" />
        Medical Analysis Results
      </h2>

      {!result && !loading && <EmptyState />}

      {loading && <LoadingState />}

      {result && (
        <div className="space-y-6">
          {/* Success Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-700 font-medium">
              Analysis completed successfully!
            </span>
          </div>

          <PatientInfoCard patient={result.extractedInfo.patient} />
          <SymptomsCard symptoms={result.extractedInfo.symptoms} />
          <ConsultationReasonCard
            reason={result.extractedInfo.consultationReason}
          />
          <DiagnosisCard diagnosis={result.diagnosis.diagnosis} />
          <TreatmentCard treatment={result.diagnosis.treatment} />
          <RecommendationsCard
            recommendations={result.diagnosis.recommendations}
          />
          <FullReportCard fullReport={result.diagnosis.fullReport} />
        </div>
      )}
    </div>
  );
};

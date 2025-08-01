import type { PatientInfo } from "../types/medical";

interface PatientInfoCardProps {
  patient: PatientInfo;
}

export const PatientInfoCard = ({ patient }: PatientInfoCardProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-800 mb-2">Patient Information</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-blue-700">Name:</span>
          <span className="ml-2 text-blue-600">{patient.name || "N/A"}</span>
        </div>
        <div>
          <span className="font-medium text-blue-700">Age:</span>
          <span className="ml-2 text-blue-600">{patient.age || "N/A"}</span>
        </div>
        <div>
          <span className="font-medium text-blue-700">ID:</span>
          <span className="ml-2 text-blue-600">{patient.id || "N/A"}</span>
        </div>
        <div>
          <span className="font-medium text-blue-700">Gender:</span>
          <span className="ml-2 text-blue-600">{patient.gender || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

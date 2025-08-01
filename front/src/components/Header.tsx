import { Activity } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export const Header = ({ title, subtitle, description }: HeaderProps) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <Activity className="h-12 w-12 text-indigo-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

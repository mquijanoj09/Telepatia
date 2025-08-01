interface FooterProps {
  appName: string;
  disclaimer: string;
}

export const Footer = ({ appName, disclaimer }: FooterProps) => {
  return (
    <div className="text-center mt-12 text-gray-500">
      <p>{appName} - Powered by Firebase Cloud Functions</p>
      <p className="text-sm mt-2">⚠️ {disclaimer}</p>
    </div>
  );
};

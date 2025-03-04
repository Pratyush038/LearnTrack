import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
      <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={20} />
      <div>
        <h3 className="font-medium">Error</h3>
        <p className="mt-1">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
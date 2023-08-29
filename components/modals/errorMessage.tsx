import React from 'react';
import { FaExclamationCircle } from "react-icons/fa";

interface ErrorProps {
    title: string;
    message: string;
  }

  const ErrorMessage: React.FC<ErrorProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-8 mt-6 mb-6">
      <FaExclamationCircle className="text-red-500 text-4xl mb-2" />
      <h2 className="text-xl font-semibold text-red-500 mb-1">{title || 'An Error Occurred'}</h2>
      <p className="text-gray-600 text-center">{message || 'Sorry, something went wrong.'}</p>
    </div>
  );
};

export default ErrorMessage;
import React from 'react';
import { FaExclamationCircle } from "react-icons/fa";
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface ErrorProps {
  title: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ title, message }) => {
  const { theme } = useTheme();
  return (
    <NoSSR>
    <div className={`flex flex-col justify-center items-center w-full p-8 mt-6 mb-6 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100'}`}>
      <FaExclamationCircle className={`text-red-500 text-4xl mb-2 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`} />
      <h2 className={`text-xl font-semibold text-red-500 mb-1 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-600'}`}>{title || 'An Error Occurred'}</h2>
      <p className={`text-gray-600 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{message || 'Sorry, something went wrong.'}</p>
    </div>
    </NoSSR>
  );
};

export default ErrorMessage;
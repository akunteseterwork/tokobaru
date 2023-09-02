import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface ConfirmModalProps {
  title: string;
  message: string;
  Button1: string;
  Button2: string;
  onConfirm: () => void;
  onConfirm2: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel, onConfirm2, Button1, Button2 }) => {
  const { theme } = useTheme();
  return (
    <NoSSR>
    <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-800'} backdrop-blur z-50`}>
      <div className={`p-8 rounded-2xl w-96 relative ${theme === 'dark' ? 'bg-zinc-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        <button
          onClick={onCancel}
          className={`absolute top-4 right-4 z-10 ${theme === 'dark' ? 'dark:text-gray-300' : ''}`}
        >
          <FaTimes />
        </button>
        <h1 className={`text-2xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-800'}`}>{title}</h1>
        <p className={`text-center mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className={`bg-green-600 text-gray-50 font-semibold px-4 py-2 rounded-xl ${theme === 'dark' ? 'dark:bg-green-600' : ''}`}
          >
            {Button1}
          </button>
          <button
            onClick={onConfirm2}
            className={`bg-red-600 text-gray-50 font-semibold px-4 py-2 rounded-xl ${theme === 'dark' ? 'dark:bg-red-600' : ''}`}
          >
            {Button2}
          </button>
        </div>
      </div>
    </div>
    </NoSSR>
  );
};

export default ConfirmModal;

import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface SuccessModalProps {
  title: string;
  message: string;
  onClose: () => void;
}
const SuccessModal: React.FC<SuccessModalProps> = ({ title, message, onClose }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleReturnToHomepage = () => {
    router.push('/');
  };

  return (
    <NoSSR>
    <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-800'} backdrop-blur z-50`}>
      <div className={`bg-white p-8 rounded-2xl shadow-md w-96 relative ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>
        <div className="flex flex-col items-center justify-center">
          <div className={`text-green-500 ${theme === 'dark' ? 'text-gray-300' : ''}`}>
            <FaCheckCircle className="text-6xl mb-2" />
          </div>
          <h2 className={`text-gray-800 text-sm font-semibold text-center mb-1 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>
            {title}
          </h2>
          <p className={`text-gray-600 mb-3 text-xs text-center ${theme === 'dark' ? 'text-gray-300' : ''}`}>
            {message}
          </p>
          <div className="flex justify-center">
            <button
              className={`bg-blue-500 text-gray-200 px-4 py-2 text-sm rounded-xl ${theme === 'dark' ? 'hover:bg-blue-600' : ''}`}
              onClick={handleReturnToHomepage}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
    </NoSSR>
  );
};

export default SuccessModal;

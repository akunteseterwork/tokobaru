import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  title: string;
  message: string;
  onClose: () => void;
}
const SuccessModal: React.FC<SuccessModalProps> = ({ title, message, onClose }) => {
  const router = useRouter();

  const handleReturnToHomepage = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 bg-gray-800 backdrop-blur z-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 relative">
        <div className="flex flex-col items-center justify-center">
          <div className="text-green-500">
            <FaCheckCircle className="text-6xl mb-2" />
          </div>
          <h2 className="text-gray-800 text-sm font-semibold text-center mb-1">
            {title}
          </h2>
          <p className="text-gray-600 mb-3 text-xs text-center">
            {message}
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-xl"
              onClick={handleReturnToHomepage}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

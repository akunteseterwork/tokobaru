import React from 'react';
import { FaTimes } from 'react-icons/fa';

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
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 bg-gray-800 backdrop-blur z-50">
      <div className=" p-8 rounded-2xl w-96 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 z-10 text-grey-50"
        >
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold text-gray-50 text-center mb-2">{title}</h1>
        <p className="text-center text-gray-50 mb-4">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-gray-50 font-semibold px-4 py-2 rounded-xl"
          >
            {Button1}
          </button>
          <button
            onClick={onConfirm2}
            className="bg-red-500 text-gray-50 font-semibold px-4 py-2 rounded-xl"
          >
            {Button2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

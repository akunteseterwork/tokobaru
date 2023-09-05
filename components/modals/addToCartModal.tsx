import React from 'react';
import { FaCheckCircle, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface AddToCartModalProps {
  title: string;
  message: string;
  onClose: () => void;
}
const AddToCart: React.FC<AddToCartModalProps> = ({ title, message, onClose }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const handleGoToCart = () => {
    router.push('/orders');
  };

  return (
    <NoSSR>
      <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-900'} backdrop-blur z-50`}>
        <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} p-8 rounded-2xl shadow-md w-96 relative`}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500">
            <FaTimes />
          </button>
          <div className="flex flex-col items-center justify-center">
            <div className={`text-green-500 ${theme === 'dark' ? 'dark:text-green-300' : ''}`}>
              <FaCheckCircle className="text-6xl mb-2" />
            </div>
            <h2 className={`text-sm font-semibold text-center mb-1 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>
              {title}
            </h2>
            <p className={`mb-3 text-xs text-center ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>
              {message}
            </p>
            <div className="flex justify-center">
              <button className={`bg-blue-500 text-gray-100 px-4 py-2 rounded-md w-full flex  justify-center items-center text-sm ${theme === 'dark' ? 'dark:bg-blue-800' : 'dark:bg-blue-500'}`} onClick={handleGoToCart}>
                <FaShoppingCart className="mr-2" />
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </NoSSR>
  );
};

export default AddToCart;

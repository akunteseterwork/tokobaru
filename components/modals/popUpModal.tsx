import React, { useState, useEffect } from 'react';

interface popUpProps {
  title: string;
  message: string;
}

const popUp: React.FC<popUpProps> = ({ title, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setIsBouncing(true);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onAnimationEnd = () => {
    setIsBouncing(false);
  };

  return (
    <div
      className={`fixed top-4 right-2 w-40 bg-red-500 text-gray-200 rounded-lg p-2 shadow-md z-50 ${isVisible ? 'animate-slideBounce' : 'hidden'
        } ${isBouncing ? 'animate-bounce' : ''}`}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-medium">{title}</h3>
      </div>
      <p className="text-xs font-normal">{message}</p>
    </div>
  );
};

export default popUp;

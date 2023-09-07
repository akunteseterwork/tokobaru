import React ,{ useEffect } from 'react';
import { FaChild } from 'react-icons/fa';
import NavbarLayout from '@/components/navbarLayout';
import FooterLayout from '@/components/footerLayout';
import { useTheme } from 'next-themes';

const PNF404 = () => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('dark', 'bg-zinc-800', 'font-inter');
    } else {
      document.body.classList.remove('dark', 'bg-zinc-800', 'font-inter');
      document.body.classList.add('bg-gray-100');
    }
  }, [theme]);

  return (
    <>
      <NavbarLayout />
      <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} flex items-center justify-center mt-6 mb-2`}>
        <FaChild className="text-lg text-blue-500 mr-2 mt-4" />
        <span className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-200' : 'text-zinc-700'}`}>
          404 - Page Not Found
        </span>
      </div>
      <FooterLayout />
    </>
  );
};

export default PNF404;

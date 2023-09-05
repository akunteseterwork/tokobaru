import React from 'react';
import { useTheme } from 'next-themes';


export default function FooterLayout() {
  const { theme } = useTheme();

  return (
    <>
    <footer className={`py-6 ${theme === 'dark' ? 'bg-zinc-800 text-gray-200' : 'bg-gray-100 text-gray-500'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs text-center">
          &copy; {new Date().getFullYear()} Tokobaru by <a href="https://www.linkedin.com/in/hilalmustofa/">mzhll</a>, All rights reserved.
        </p>
      </div>
    </footer>
    </>
  );
}

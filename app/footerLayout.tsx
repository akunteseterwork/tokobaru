import React from 'react';

export default function FooterLayout() {

  return (
    <footer className="bg-gray-100 text-gray-500 py-6">
    <div className="max-w-4xl mx-auto px-4">
      <p className="text-xs text-center">
        &copy; {new Date().getFullYear()} Tokobiru by <a href="https://www.linkedin.com/in/hilalmustofa/">mzhll</a>, All rights reserved.
      </p>
    </div>
  </footer>
  );
}

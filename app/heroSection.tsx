import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProduct {
  id: number;
  name: string;
  picture: string;
  description: string;
}

interface HeroSectionProps {
  currentDisplayedProduct: HeroProduct;
}

const HeroSection: React.FC<HeroSectionProps> = React.memo(({ currentDisplayedProduct }) => {
  return (
    <div className="flex bg-gray-100 py-4 md:justify-center">
      {currentDisplayedProduct && (
        <div
          className={`lg:w-2/3 p-4 lg:pb-0 lg:pr-24 lg:pl-24 lg:mr-20 lg:ml-20`}
        >
          <div className="relative shadow-image-detail">
            <Image
              src={currentDisplayedProduct.picture}
              alt={currentDisplayedProduct.name}
              width={200}
              height={200}
            />
          </div>
          <h2 className="text-3xl text-gray-800 font-semibold mb-2">
            {currentDisplayedProduct.name}
          </h2>
          <p className="text-sm text-gray-500">
            {currentDisplayedProduct.description.length > 200
              ? `${currentDisplayedProduct.description.slice(0, 200)}...`
              : currentDisplayedProduct.description}
            <Link href={`/product/${currentDisplayedProduct.id}`}>
              <span className="text-blue-500 font-semibold ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
});

export default HeroSection;

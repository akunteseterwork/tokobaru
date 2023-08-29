import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import { fetchData } from '../utils/fetcher';

const HeroSection: React.FC = React.memo(() => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isProductVisible, setIsProductVisible] = useState(false);

  const { data: productsData} = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/`,
    fetchData
  );
  const productsCount = productsData?.data.products.length || 0;
  const currentDisplayedProduct = productsData?.data.products[currentProductIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => (prevIndex + 1) % productsCount);
      setIsProductVisible(false);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [productsCount]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsProductVisible(true);
    }, 80);

    return () => clearTimeout(timeout);
  }, [currentProductIndex]);

  return (
    <div className="flex bg-gray-100 py-4 md:justify-center">
      {currentDisplayedProduct && (
        <div
          className={`lg:w-2/3 p-4 lg:pb-0 lg:pr-24 lg:pl-24 lg:mr-20 lg:ml-20 ${isProductVisible ? "opacity-100 transition-opacity duration-500" : "opacity-0"
            }`}
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

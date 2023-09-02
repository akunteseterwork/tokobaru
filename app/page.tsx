
"use client"
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetchData } from '@/utils/fetcher';
import SidebarSection from './categorySiebar';
import ErrorMessage from '@/components/modals/errorMessage';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavbarLayout from './navbarLayout';
import FooterLayout from './footerLayout';
import ProductList from './productList';
import HeroSection from './heroSection';
import { useTheme } from 'next-themes';
import NoSSR from '@/components/noSSR';


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const productsPerPage = 6;
  const { theme } = useTheme();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=${currentPage}&per_page=${productsPerPage}`,
    fetchData
  );
  const totalPages = Math.ceil((data?.data.total || 0) / productsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('dark', 'bg-zinc-800', 'font-inter');
    } else {
      document.body.classList.remove('dark', 'bg-zinc-800', 'font-inter');
      document.body.classList.add('bg-gray-100');
    }
  }, [theme]);

  if (error) return <ErrorMessage title="Error Loading Data" message="Unable to fetch data. Please try again later." />;
  if (!data)
    return (
      <div className={`flex justify-center items-center w-full h-screen ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return (
    <NoSSR>
      <NavbarLayout />
      <HeroSection />
      <div className={`lg:pl-100 flex justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <SidebarSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <ProductList
          products={data.data.products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className={`flex justify-center mt-4 mr-10 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="pagination-container text-sm mb-4">
          <button
            className={`text-blue-500 px-2 py-1 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className={`mx-2 ${theme === 'dark' ? 'text-gray-200' : ''}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`text-blue-500 px-2 py-1 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <FooterLayout />
    </NoSSR>
  );
}
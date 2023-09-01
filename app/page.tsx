"use client"
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetchData, fetchHeroSectionData } from '@/utils/fetcher';
import SidebarSection from './categorySiebar';
import ErrorMessage from '@/components/modals/errorMessage';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NavbarLayout from './navbarLayout';
import FooterLayout from './footerLayout';
import ProductList from './productList';
import HeroSection from './heroSection';

async function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const heroProductData = await fetchHeroSectionData();
  const productsPerPage = 6;
  
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products?page=${currentPage}&per_page=${productsPerPage}`,
    fetchData
  );
  const totalPages = Math.ceil((data?.data.total || 0) / productsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <ErrorMessage title="Error Loading Data" message="Unable to fetch data. Please try again later." />;
  if (!data)
    return (
      <div className="flex bg-gray-100 justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return (
    <>
    <NavbarLayout />
    <HeroSection currentDisplayedProduct={heroProductData}/>
    <div className="bg-gray-100">
      <div className="lg:pl-100 flex justify-center">
      <SidebarSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <ProductList
          products={data.data.products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex justify-center mt-4">
        <div className="pagination-container text-sm mb-4">
          <button
            className={`text-blue-500 px-2 py-1 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className="mx-2 text-gray-500">
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
    </div>
    <FooterLayout />
    </>
  );
}

module.exports=Home;
"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetchData } from '../../../utils/fetcher';
import SidebarSection from '../../categorySiebar';
import ProductList from '../../productList';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function Categories({ params }: { params: { slug: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const productsPerPage = 6;
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${params.slug}?page=${currentPage}&per_page=${productsPerPage}`,
    fetchData
  );
  const totalPages = Math.ceil((data?.data.total || 0) / productsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <div>Error loading data</div>;
  if (!data)
    return (
      <div className="flex bg-gray-100 justify-center items-center w-full min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return (

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
  );
}



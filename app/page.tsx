
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
import SearchBar from './searchBar';
import { usePathname } from 'next/navigation'


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false)
  const productsPerPage = 6;
  const { theme } = useTheme();
  const pathname = usePathname()
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/products?page=${currentPage}&per_page=${productsPerPage}`, fetchData );
  const totalPages = Math.ceil((data?.data.total || 0) / productsPerPage);

  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?search=${query}`);
      const data = await response.json();
      setFilteredProducts(data.data.products);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      setFilteredProducts([]);
      return [];
    }
  };
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
    if (searchQuery === '') {
      if (data) {
        setFilteredProducts(data.data.products);
      }
    }
    if (pathname?.startsWith('/categories')) {
      setIsCategorySelected(true); 
    } else {
      setIsCategorySelected(false); 
    }
  }, [theme, searchQuery, data, pathname]);

  if (error) return <ErrorMessage title="Error Loading Data" message="Unable to fetch data. Please try again later." />;
  if (!data)
    return (
      <div className={`flex justify-center items-center w-full h-screen ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return (
    <>
      <NavbarLayout />
      <HeroSection />
      <div className={`lg:pl-100 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="flex justify-center p-4">
            <SidebarSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className="sm:w-2/6 xs:w-4/12 lg:w-3/6 xl:w-5/12">
            {!isCategorySelected && <SearchBar onSearch={handleSearch} />}
              <ProductList
                products={filteredProducts || (data ? data.data.products : [])}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center mt-4 md:mr-4 sm:mr-0 xs:mr-4 lg:mr-10 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`} >
        <div className="pagination-container text-sm mb-4">
          <button
            className={`text-blue-500 px-2 py-1 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "" }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1} >
            <FaChevronLeft 
            />
          </button>
          <span className={`mx-2 ${theme === 'dark' ? 'text-gray-200' : ''}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`text-blue-500 px-2 py-1 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "" }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages} >
            <FaChevronRight 
            />
          </button>
        </div>
      </div>
      <FooterLayout />
    </>
  );
}
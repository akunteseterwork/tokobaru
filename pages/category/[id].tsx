import React, { useState } from 'react';
import '@/app/globals.css';
import SidebarSection from '@/app/categorySiebar';
import ProductList from '../../app/productList';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import NavbarLayout from '@/app/navbarLayout';
import HeroSection from '@/app/heroSection';
import FooterLayout from '@/app/footerLayout';
import { fetchData } from '@/utils/fetcher';

interface Product {
  id: number;
  name: string;
  picture: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryDetail {
  id: number;
  name: string;
  icon: string;
  total: number;
  page: number;
  per_page: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

interface CategoriesProps {
  data: CategoryDetail;
  productsData: ProductsData; // Add this line
}

interface ProductsData {
  data: {
    products: Product[];
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const data = await res.json();
  const paths = data.data.map((category: any) => ({
    params: { id: category.id.toString() }, 
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoriesProps> = async ({ params }: GetStaticPropsContext) => {
  const id = params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}?page=1&per_page=9`);
  const categoryData = await res.json();
  
  const productsData = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/products?per_page=1000`);
  
  return {
    props: {
      data: categoryData.data,
      productsData,
    },
    revalidate: 60 * 1,
  };
};

export default function Categories({ data, productsData }: CategoriesProps) {
  if (!data) {
    return <div>Loading...</div>;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const productsPerPage = 6;
  const totalPages = Math.ceil((data.total || 0) / productsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
    <NavbarLayout />
    <HeroSection productsData={productsData} />
    <div className="bg-gray-100">
      <div className="lg:pl-100 flex justify-center">
        <SidebarSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <ProductList
          products={data.products}
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



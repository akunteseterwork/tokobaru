import React, { useState } from 'react';
import SidebarSection from '@/app/categorySiebar';
import ProductList from '@/app/productList';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GetStaticProps, GetStaticPaths } from 'next';
import NavbarLayout from '@/app/navbarLayout';
import HeroSection from '@/app/heroSection';
import FooterLayout from '@/app/footerLayout';
import { useTheme } from 'next-themes';
import NoSSR from '@/components/noSSR';
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

export const getStaticProps: GetStaticProps<CategoriesProps> = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}?page=1&per_page=9`);
  const data = await res.json();
  return {
    props: {
      data: data.data,
    },
    revalidate: 60 * 1
  };
};

export default function Categories({ data }: CategoriesProps) {
  if (!data) {
    return <div>Loading...</div>;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);
  const { theme } = useTheme();
  const productsPerPage = 6;
  const totalPages = Math.ceil((data.total || 0) / productsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <NoSSR>
      <NavbarLayout />
      <HeroSection />
      <div className={`lg:pl-100 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <div className="flex justify-center p-4">
            <SidebarSection isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className="sm:w-2/6 xs:w-4/12 lg:w-3/6 xl:w-5/12">
              <ProductList
                products={data.products}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center mt-4 md:mr-4 sm:mr-0 xs:mr-4 lg:mr-10 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
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

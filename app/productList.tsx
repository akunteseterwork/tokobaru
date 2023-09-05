import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface ProductListProps {
  products: any[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
}

const formatRupiah = (money: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};

function splitIntoGroups(text: string, groupSize: number) {
  const words = text.split(" ");
  const groups = [];
  for (let i = 0; i < words.length; i += groupSize) {
    groups.push(words.slice(i, i + groupSize));
  }
  return groups;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { theme } = useTheme();
  const [searchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);


  if (!filteredProducts) {
    return (
      <div className={`flex justify-center items-center w-full h-screen ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return <div className={`text-left p-8 text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-black'}`}>No product found 🗿</div>;
  }

  if (!products)
    return (
      <div className={`flex justify-center items-center w-full h-screen ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );
    
  return (
    <>
      <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 ${theme === 'dark' ? 'text-gray-200' : 'text-black'}`}>
        {filteredProducts.map((product: any) => (
          <div key={product.id} className="p-3 relative">
            <div className="relative sm:w-42 sm:h-42 lg:w-32 lg:h-32 md:w-38 md:h-38">
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-full rounded-lg shadow-image">
                  <Image src={product.picture} alt={product.name} width={200} height={200} />
                </div>
              </Link>
              <div className="absolute bottom-0 text-gray-100 right-0 bg-green-600 bg-opacity-80 text-xs text-opacity-75 rounded-br-md rounded-tl-md px-1 py-0">
                in stock: {product.stock}
              </div>
            </div>
            <Link href={`/product/${product.id}`}>
              <h2 className="text-sm font-semibold mt-3">
                {splitIntoGroups(product.name, 3).map((group, index) => (
                  <div key={index}>{group.join(" ")}</div>
                ))}
              </h2>
            </Link>
            <p className="text-xs ">{formatRupiah(product.price)}</p>
            <div className="mt-2"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;

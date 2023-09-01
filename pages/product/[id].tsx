import React, { useState } from 'react';
import '@/app/globals.css'
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import AddToCart from '@/components/modals/addToCartModal';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { fetchWithToken } from '@/utils/fetcher';
import NavbarLayout from '@/app/navbarLayout';
import FooterLayout from '@/app/footerLayout';

interface ProductDetail {
  id: number;
  name: string;
  picture: string;
  description: string;
  price: number;
  stock: number;
}

interface DetailProps {
  data: ProductDetail;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await res.json();
  const totalProducts = data.data.total;
  const productsPerPage = data.data.per_page;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paths: { params: { id: string } }[] = [];
  for (let page = 1; page <= totalPages; page++) {
    const pageRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}`);
    const pageData = await pageRes.json();
    pageData.data.products.forEach((product: any) => {
      paths.push({ params: { id: product.id.toString() } });
    });
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<DetailProps> = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const data = await res.json();
  return {
    props: {
      data : data.data
    }
  };
};

export default function Detail({ data }: DetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/orders/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: quantity }),
      });

      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formatRupiah = (money: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(money);
  };

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <NavbarLayout />
    <div className="bg-gray-100 flex justify-center items-center p-8">
      <div className="max-w-4xl w-full p-2 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-8">
            <Image
              src={data.picture}
              alt={data.name}
              width={500}
              height={500}
              className="shadow-image-detail"
            />
          </div>
          <div className="w-full md:w-6/12">
            <h1 className="text-2xl font-semibold text-gray-800">{data.name}</h1>
            <p className="text-gray-600">{formatRupiah(data.price)}</p>
            <p className="text-gray-500 mt-2">In Stock: {data.stock}</p>
            <div className="mt-4 flex items-center">
              <button
                onClick={handleDecrement}
                className="text-red-600"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  if (!isNaN(inputValue)) {
                    setQuantity(Math.max(inputValue, 1));
                  }
                }}
                className="w-12 text-center mx-2 text-black border-blue-300 rounded"
              />
              <button
                onClick={handleIncrement}
                className="text-green-600"
              >
                <FaPlus />
              </button>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center" onClick={handleAddToCart}>
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <div className="mt-4 text-sm">
              <p className="text-gray-700">{data.description}</p>
            </div>
          </div>
          {modalOpen && (
        <AddToCart title="Add to Cart Success" message="You can now checkout or close this to continue shopping"  onClose={handleCloseModal}/>
      )}
        </div>
      </div>
    </div>
    <FooterLayout />
    </>
  );
}

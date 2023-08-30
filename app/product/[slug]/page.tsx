"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetchData, fetchWithToken } from '../../../utils/fetcher';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import AddToCart from '../../../components/modals/addToCartModal';


export default function Detail({ params }: { params: { slug: string } }) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.slug}`, fetchData
  );
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    try {
      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.slug}`, {
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
  }

  const formatRupiah = (money:number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (error) return <div className="text-center mt-8">Error loading data</div>;
  if (!data)
    return (
      <div className="flex bg-gray-100 justify-center items-center w-full h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return (
    <div className="bg-gray-100 flex justify-center items-center p-8">
      <div className="max-w-4xl w-full p-2 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-4 md:mb-0 md:mr-8">
            <Image
              src={data.data.picture}
              alt={data.data.name}
              width={500}
              height={500}
              className="shadow-image-detail"
            />
          </div>
          <div className="w-full md:w-6/12">
            <h1 className="text-2xl font-semibold text-gray-800">{data.data.name}</h1>
            <p className="text-gray-600">{formatRupiah(data.data.price)}</p>
            <p className="text-gray-500 mt-2">In Stock: {data.data.stock}</p>
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
            <div className="mt-4">
              <p className="text-gray-700">{data.data.description}</p>
            </div>
          </div>
          {modalOpen && (
        <AddToCart title="Add to Cart Success" message="You can now checkout or close this to continue shopping"  onClose={handleCloseModal}/>
      )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const product = { slug: params.slug };
  return {
    props: {
      product,
    },
  };
}

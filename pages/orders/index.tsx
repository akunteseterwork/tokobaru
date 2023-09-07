"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetchWithToken } from '@/utils/fetcher';
import { FaShoppingCart, FaTrash, FaChild } from 'react-icons/fa';
import Image from 'next/image';
import ErrorMessage from '@/components/modals/errorMessage';
import SuccessModal from '@/components/modals/successModal';
import NavbarLayout from '@/components/navbarLayout';
import FooterLayout from '@/components/footerLayout';
import { useTheme } from 'next-themes';
import NoSSR from '@/components/noSSR';
interface OrderItem {
  orderId: number;
  productId: number;
  productName: string;
  productPicture: string;
  productPrice: number;
  amount: number;
  totalPrice: number;
}

const CartPage: React.FC = () => {
  const { data, error, mutate } = useSWR<{ data: OrderItem[] }>(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`, fetchWithToken);
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('dark', 'bg-zinc-800', 'font-inter');
    } else {
      document.body.classList.remove('dark', 'bg-zinc-800', 'font-inter');
      document.body.classList.add('bg-gray-100');
    }
  }, [theme]);

  const removeItem = async (orderId: number) => {
    try {
      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`, {
        method: 'DELETE',
      });
      mutate();
    } catch (error) {
      return;
    }
  };

  const handleCheckout = async () => {
    try {
      const orderIdsToProcess = data?.data?.map(item => item.orderId);

      if (!orderIdsToProcess || orderIdsToProcess.length === 0) {
        return;
      }

      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/orders/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderIds: orderIdsToProcess }),
      });

      setModalOpen(true);
    } catch (error) {
      return;
    }
  };


  const formatRupiah = (money: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(money);
  };
  if (!data)
    return (
      <>
      <NavbarLayout />
      <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} flex items-center justify-center mt-6 mb-2`}>
      <FaChild className="text-lg text-blue-500 mr-2 mt-4" />
      <span className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-200' : 'text-zinc-700'}`}>
      No order here, please add product
      </span>
      </div>
      <FooterLayout />
    </>
    );
  if (error) return (
    <>
    <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
      <NavbarLayout />
      <div className={`${theme === 'dark' ? 'text-gray-200' : 'text-zinc-700'}`}/>
      <ErrorMessage title="Error Loading Order" message="Or your have no orders. Please order a product"/>
      </div>
      <FooterLayout />
    </>
  );

  return (
    <>
      <NavbarLayout />
      <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'} flex justify-center items-center p-4`}>
        <div className="max-w-4xl w-full p-2 rounded-lg">
          <h1 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}> Your cart</h1>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="grid gap-4 md:grid-cols-1">
              {data?.data?.map((item) => (
                <div key={item.orderId} className={`relative p-2 rounded-lg shadow-md ${theme === 'dark' ? 'bg-[#212121]' : 'bg-gray-100'}`}>
                  <button onClick={() => removeItem(item.orderId)} className="absolute top-0 right-0 text-red-500">
                    <FaTrash className="mr-6 mt-6" />
                  </button>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image src={item.productPicture} alt={item.productName} width={75} height={75} className="object-cover rounded" />
                    </div>
                    <div className="flex-grow ml-4">
                      <h2 className={`text-md font-semibold ${theme === 'dark' ? 'text-gray-200' : ''}`}>{item.productName}</h2>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Price: {formatRupiah(item.productPrice)}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-200' : ''}`}>Quantity: {item.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="p-4 mb-4">
                <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Order Summary</h2>
                <div className="flex justify-between items-center mb-2">
                  <p className={`${theme === 'dark' ? 'text-gray-200' : ''}`}>Total:</p>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : ''}`}>{formatRupiah(data?.data?.reduce((total, item) => total + item.totalPrice, 0) || 0)}</p>
                </div>
                <button className="bg-blue-500 text-gray-100 px-4 py-2 rounded-md w-full flex  justify-center items-center" onClick={handleCheckout}>
                  <FaShoppingCart className="mr-2" />
                  Checkout
                </button>
              </div>
            </div>
            {isModalOpen && (
              <SuccessModal title="Order Processed" message="Your order has been processed" onClose={() => setModalOpen(false)} />
            )}
          </div>
        </div>
      </div>
      <FooterLayout />
    </>
  );
};

export default CartPage;

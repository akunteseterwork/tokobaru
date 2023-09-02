import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import AddToCart from '@/components/modals/addToCartModal';
import { FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { fetchWithToken } from '@/utils/fetcher';
import NavbarLayout from '@/app/navbarLayout';
import FooterLayout from '@/app/footerLayout';
import { useTheme } from 'next-themes';
import NoSSR from '@/components/noSSR';
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?per_page=1000`);
  const data = await res.json();

  const paths = data.data.products.map((product: any) => ({
    params: { id: product.id.toString() },
  }));

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
      data: data.data
    },
    revalidate: 60 * 1
  };
};

export default function Detail({ data }: DetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const data = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/users/my`);
        if (data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

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
      setError('You need to login first');
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

  return (
    <NoSSR>
      <NavbarLayout />
      <div className={theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}>
        <div className="flex justify-center items-center p-8">
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
                <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-200' : ''}`}>{data.name}</h1>
                <p className={theme === 'dark' ? 'text-gray-200' : ''}>{formatRupiah(data.price)}</p>
                <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-200' : ''}`}>In Stock: {data.stock}</p>
                {isAuthenticated && (
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
                      className={`w-12 text-center mx-2 border-zinc-300 rounded ${theme === 'dark' ? 'bg-zinc-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`} />
                    <button
                      onClick={handleIncrement}
                      className="text-green-600"
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}

                {isAuthenticated ? (
                  <button
                    className="mt-4 bg-blue-500 text-gray-100 px-4 py-2 rounded-md flex items-center"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                ) : (
                  <p className="mt-4 text-sm text-red-500">Login to add to cart</p>
                )}

                <div className="mt-4 text-sm">
                  <p className={`text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}>{data.description}</p>
                </div>
              </div>
              {modalOpen && (
                <AddToCart title="Add to Cart Success" message="You can now checkout or close this to continue shopping" onClose={handleCloseModal} />
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterLayout />
    </NoSSR>
  );
}

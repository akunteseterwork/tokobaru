import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import useSWR from 'swr';
import ErrorMessage from '@/components/modals/errorMessage';
import NavbarLayout from '@/app/navbarLayout';
import { fetchWithToken } from '@/utils/fetcher';
import FooterLayout from '@/app/footerLayout';
import EditProductModal from '@/components/modals/editProductModal';
import ConfirmModal from '@/components/modals/confirmModal';
import NoSSR from '@/components/noSSR';
import { useTheme } from 'next-themes';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  picture: string;
}

const UserProductPage: React.FC = () => {
  const { data, error, mutate } = useSWR<{ data: Product[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/products/my`,
    fetchWithToken
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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


  const openEditModal = (productId: number) => {
    setSelectedProductId(productId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProductId(null);
    setEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    mutate();
    closeEditModal();
  };

  if (error) {
    return (
      <>
        <NavbarLayout />
        <ErrorMessage
          title="Error Loading Products"
          message="There was an error loading your products."
        />
        <FooterLayout />
      </>
    );
  }

  const handleDelete = async (productId: number) => {
    setSelectedProductId(productId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProductId}`, {
        method: 'DELETE',
      });
      mutate();
    } catch (error) {
      return;
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <NoSSR>
      <NavbarLayout />
      <div className={`max-w-4xl sm:w-full p-4 xs:2/6 lg:h-3/4 rounded-lg mx-auto ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
        <h1 className={`text-md text-center font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}> Your Products</h1>
        {data?.data?.map((product) => (
          <div key={product.id} className={`flex items-center justify-between p-4 mb-2 ${theme === 'dark' ? 'bg-[#212121]' : 'bg-gray-100'} rounded-lg shadow-md lg:w-1/2 mx-auto`}>
            <div className="flex items-center">
              <Image src={product.picture} alt={product.name} width={75} height={75} className="object-cover rounded" />
              <div className="flex-grow">
                <h2 className={`text-sm font-semibold  ${theme === 'dark' ? 'text-gray-200' : ''}`}>{product.name}</h2>
                <p className={`text-xs sm:text-xs  ${theme === 'dark' ? 'text-gray-200' : ''} mb-2`}>Price: {product.price}</p>
                <p className={`text-[12px] sm:text-xs  ${theme === 'dark' ? 'text-gray-200' : ''}`}>Stock: {product.stock}</p>
              </div>
            </div>
            <div className="text-xs flex flex-col ml-4 gap-2">
              <button onClick={() => openEditModal(product.id)} className="text-blue-500">
                <FaEdit className="mx-auto text-xs" />
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)} className="text-red-500">
                <FaTrash className="mx-auto text-xs" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showDeleteConfirmation && (
        <ConfirmModal
          title="Watch out!"
          message="Are you sure you want to delete this item?"
          onConfirm={handleConfirmDelete}
          onConfirm2={handleConfirmDelete}
          onCancel={handleCancelDelete}
          Button1="Confirm but in green"
          Button2="Confirm"
        />
      )}
      {isEditModalOpen && selectedProductId && (
        <EditProductModal
          productId={selectedProductId}
          onClose={closeEditModal}
          onSuccess={handleEditSuccess}
        />
      )}
      <FooterLayout />
    </NoSSR>
  );
};

export default UserProductPage;

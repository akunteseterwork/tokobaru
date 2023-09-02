import React, { useState, useEffect } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import PopUp from './popUpModal';
import { fetchWithToken } from '@/utils/fetcher';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface Category {
  id: number;
  name: string;
}
interface AddProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSuccess }) => {
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        if (response.ok) {
          const data = await response.json();
          if (data.code === 200) {
            setCategories(data.data);
          } else {
          }
        } else {
        }
      } catch (error) {
        return;
      }
    }

    fetchCategories();
  }, []);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('categoryId', categoryId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      if (picture) {
        formData.append('picture', picture);
      }

      const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        body: formData,
      });
      if (response.code === 201) {
        setSuccessMessage('Product added successfully!');
        onClose();
        onSuccess();
        setLoading(false);
      } else {
        setError(response.data.message || 'Product add failed');
      }
    } catch (error) {
      setError('All fields are required');
      setLoading(false);
    }
  };

  return (
    <NoSSR>
      <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} backdrop-blur z-50`}>
        <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} p-8 rounded-2xl shadow-md w-96 relative text-sm`}>
          <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500">
            <FaTimes />
          </button>
          <h1 className={`font-bold text-[18px] text-center mb-4 ${theme === 'dark' ? 'text-gray-200' : ''}`}>Add Product</h1>
          <form onSubmit={handleAddProduct}>
            {successMessage && (
              <p className={`text-green-500 mb-2 text-center ${theme === 'dark' ? 'text-gray-200' : ''}`}>{successMessage}</p>
            )}
            <div className="mb-4">
              <select
                id="categoryId"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={String(category.id)}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="description"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="price"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                id="stock"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 mt-2">
              <label htmlFor="picture" className={`"cursor-pointer flex justify-center space-x-2 mt-1 border-dashed border-2 rounded-xl p-2 ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                <FaUpload />
                <span>Upload Picture</span>
              </label>
              <input
                type="file"
                id="picture"
                accept="image/*"
                className="hidden"
                required
                onChange={(e) => setPicture(e.target.files && e.target.files[0])}
              />
            </div>
            {error && (<PopUp title="Error" message={error} />)}
            {loading ? (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
              </div>
            ) : (
              <div className="flex justify-center">
                <button type="submit" onClick={handleAddProduct} className={`bg-blue-500 text-gray-100 px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-blue-500' : ''}`}>
                  Add Product
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </NoSSR>
  );
};

export default AddProductModal;

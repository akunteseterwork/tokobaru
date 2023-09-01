import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import PopUp from './popUpModal';
import { fetchWithToken } from '@/utils/fetcher';

interface AddProductModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose, onSuccess }) => {
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [picture, setPicture] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
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
      } else {
        setError(response.data.message || 'Product add failed');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred while adding the product');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 bg-gray-800 backdrop-blur z-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 relative text-sm text-gray-700">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500">
          <FaTimes />
        </button>
        <h1 className="font-bold text-[18px] text-center mb-4">Add Product</h1>
        <form onSubmit={handleAddProduct}>
          {successMessage && (
            <p className="text-green-500 mb-2 text-center">{successMessage}</p>
          )}
          <div className="mb-4">
            <input
              type="text"
              id="categoryId"
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
              placeholder="Category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
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
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
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
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
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
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 mt-2">
            <label htmlFor="picture" className="cursor-pointer flex justify-center space-x-2 mt-1 border-dashed border-2 rounded-xl p-2">
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
          <div className="flex justify-center">
            <button type="submit" onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded-xl">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;

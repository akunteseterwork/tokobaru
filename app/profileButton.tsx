import React, { useState, useEffect, useRef } from 'react';
import { FaPlusCircle, FaSignOutAlt, FaUser, FaBoxOpen } from 'react-icons/fa';
import Image from 'next/image';
import ConfirmModal from '@/components/modals/confirmModal';
import Link from 'next/link';
import AddProductModal from '@/components/modals/addProductModal';
import { useTheme } from 'next-themes';
interface ProfileButtonProps {
  onLogout: () => void;
  userData: UserData | null;
}
interface UserData {
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  role: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout, userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSuccessAddProductModal, setShowSuccessAddProductModal] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

  const handleProfileClick = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirmation(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const handleAddProduct = () => {
    setShowSuccessAddProductModal(false);
    setShowAddProductModal(true);
  }

  const handleCloseProductModal = () => {
    setShowAddProductModal(false);
  }

  const handleAddProductSuccess = () => {
    setShowSuccessAddProductModal(true);
    setShowAddProductModal(false);
  }

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleProfileClick} className={`rounded-full w-10 h-10 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-300'}`}>
        {userData?.avatar ? (
          <Image
            src={userData.avatar}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full mx-auto my-auto shadow-xl"
          />
        ) : (
          <FaUser className={`text-lg mx-auto my-auto ${theme === 'dark' ? 'text-gray-200' : ''}`} />
        )}
      </button>
      {showDropdown && (
        <div className={`absolute top-12 right-0 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-2xl shadow-md z-50 w-36`}>
          <ul className="py-2 shadow-md">
            <Link href="/profile">
              <li className="flex text-sm items-center px-4 py-2 hover:text-blue-600 hover:font-semibold cursor-pointer">
                <FaUser className={`mr-2 text-sm text-gray-600 ${theme === 'dark' ? 'text-gray-200' : ''}`} />
                My Profile
              </li>
            </Link>
            <Link href="/product/my">
              <li className="flex text-sm items-center px-4 py-2 hover:text-blue-600 hover:font-semibold cursor-pointer">
                <FaBoxOpen className={`mr-2 text-sm text-gray-600 ${theme === 'dark' ? 'text-gray-200' : ''}`} />
                My Product
              </li>
            </Link>
            <li className="flex text-sm items-center px-4 py-2 hover:text-blue-600 hover:font-semibold cursor-pointer" onClick={handleAddProduct}>
              <FaPlusCircle className={`mr-2 text-sm text-gray-600 ${theme === 'dark' ? 'text-gray-200' : ''}`} />
              Add Product
            </li>
            <li
              onClick={handleLogoutClick}
              className="flex text-sm items-center px-4 py-2 hover:text-red-800 hover:font-semibold cursor-pointer text-red-500">
              <FaSignOutAlt className="mr-2 text-sm text-red-600" />
              Logout
            </li>
          </ul>
        </div>
      )}
      {showAddProductModal && (
        <AddProductModal
          onClose={handleCloseProductModal}
          onSuccess={handleAddProductSuccess}
        />
      )}
      {showLogoutConfirmation && (
        <ConfirmModal
          title="Logout Confirmation"
          message="Are you sure you want to logout?"
          onConfirm={handleConfirmLogout}
          onConfirm2={handleConfirmLogout}
          onCancel={handleCancelLogout}
          Button1="Confirm but in green"
          Button2="Confirm"
        />
      )}
      {showSuccessAddProductModal && (
        <ConfirmModal
          title="Success Add Product"
          message="What are you gonna do now?"
          onConfirm2={handleGoHome}
          onConfirm={handleAddProduct}
          onCancel={handleCloseProductModal}
          Button2='Go Home'
          Button1='Add another product'
        />
      )}
    </div>
  );
};

export default ProfileButton;

"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaListAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '../utils/fetcher';
import Image from 'next/image';
import ConfirmModal from '../components/modals/confirmModal';

interface ProfileButtonProps {
  onLogout: () => void;
}

interface UserData {
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  role: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/users/my`);
        setUserData(data.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleProfileClick} className="rounded-full w-10 h-10 bg-gray-300">
        {userData?.avatar ? (
          <Image
            src={userData.avatar}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full mx-auto my-auto shadow-xl"
          />
        ) : (
          <FaUser className="text-white text-lg mx-auto my-auto" />
        )}
      </button>
      {showDropdown && (
        <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-md z-50 w-36">
          <ul className="py-2 shadow-md">
    <li className="flex text-sm items-center px-4 py-2 hover:text-blue-600 hover:font-semibold cursor-pointer">
      <FaUser className="mr-2 text-sm text-gray-600" />
      My Profile
    </li>
    <li className="flex text-sm items-center px-4 py-2 hover:text-blue-600 hover:font-semibold cursor-pointer">
      <FaListAlt className="mr-2 text-sm text-gray-600" />
      My Products
    </li>
    <li
      onClick={handleLogoutClick}
      className="flex text-sm items-center px-4 py-2 hover:text-red-800 hover:font-semibold cursor-pointer text-red-500"
    >
      <FaSignOutAlt className="mr-2 text-sm text-red-600" />
      Logout
    </li>
  </ul>
        </div>
      )}
      {showLogoutConfirmation && (
        <ConfirmModal
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    )}
    </div>
  );
};

export default ProfileButton;

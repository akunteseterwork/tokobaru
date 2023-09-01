"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchWithToken } from '@/utils/fetcher';
import NavbarLayout from '@/app/navbarLayout';
import FooterLayout from '@/app/footerLayout';

interface UserProfile {
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  role: string;
}

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/users/my`);
        if (response.code === 200) {
          setUserProfile(response.data);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <>
      <NavbarLayout />
      <div className="bg-gray-100 flex justify-center items-center p-8">
        <div className="max-w-4xl w-full p-2 rounded-lg">
          {userProfile ? (
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mb-4">
                <Image
                  src={userProfile.avatar}
                  alt={`${userProfile.fullname}'s Avatar`}
                  width={160}
                  height={160}
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-800">{userProfile.fullname}</h1>
                <div className="mt-2 grid grid-cols-2 gap-2 justify-center">
                  <p className="text-right text-gray-600 font-semibold">Username:</p>
                  <p className="text-left text-gray-800">{userProfile.username}</p>
                  <p className="text-right text-gray-600 font-semibold">Role:</p>
                  <p className="text-left text-gray-800">{userProfile.role}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading user profile...</p>
          )}
        </div>
      </div>
      <FooterLayout />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProfileButton from './profileButton';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchWithToken } from '@/utils/fetcher';
import LoginModal from '@/components/modals/loginModal';
import RegisterModal from '@/components/modals/registerModal';
import ConfirmModal from '@/components/modals/confirmModal';
const { useRouter } = require('next/navigation');

interface UserData {
    id: number;
    username: string;
    fullname: string;
    avatar: string;
    role: string;
}

export default function NavbarLayout() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isAuthenticationChecked, setIsAuthenticationChecked] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSuccessRegisterModal, setShowSuccessRegisterModal] = useState(false);
    const [orderCount, setOrderCount] = useState<number>(0);
    const route = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const data = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/users/my`);
                setUserData(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsAuthenticationChecked(true);
            }
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        const fetchOrderCount = async () => {
            try {
                const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/orders/my`);
                const orderData = response.data;
                const count = Array.isArray(orderData) ? orderData.reduce((total, item) => total + item.amount, 0) : 0;
                setOrderCount(count);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrderCount();
    }, []);

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
    };

    const handleRegisterSuccess = () => {
        setShowSuccessRegisterModal(true);
        setShowRegisterModal(false);
    };

    const handleConfirmLogout = async () => {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        route.push('/');
        window.location.reload();
    };

    const handleCancelRegister = () => {
        setShowSuccessRegisterModal(false);
    };

    const handleGoHome = () => {
        window.location.href = "/";
    };

    const handleGoRickRoll = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    return (
        <nav className="bg-gray-50 text-gray-700 py-1">
            <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
                <Link href="/">
                    <span className="text-xl font-semibold">Tokobaru</span>
                </Link>
                <div className="p-2">
                    <div className="flex items-center space-x-4">
                        {isAuthenticationChecked && (
                            userData ? (
                                <>
                                    <Link href="/orders">
                                        <span className="text-grey-500 text-3xl mb-2 relative">
                                            <FaShoppingCart />
                                            {orderCount > 0 && (
                                                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                                                    {orderCount}
                                                </span>
                                            )}
                                        </span>
                                    </Link>
                                    <div className="">
                                        <ProfileButton onLogout={handleConfirmLogout} userData={userData} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="#"
                                        onClick={handleLoginClick}
                                        className="text-gray-500 text-sm font-semibold"
                                    >
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        href="#"
                                        onClick={handleRegisterClick}
                                        className="text-gray-500 text-sm font-semibold"
                                    >
                                        <span>Register</span>
                                    </Link>
                                </>
                            )
                        )}
                    </div>
                </div>
                {showLoginModal && (
                    <LoginModal onClose={handleCloseLoginModal} />
                )}
                {showRegisterModal && (
                    <RegisterModal
                        onClose={handleCloseRegisterModal}
                        onSuccess={handleRegisterSuccess}
                    />
                )}
            </div>
            {showSuccessRegisterModal && (
                <ConfirmModal
                    title="Registration Success"
                    message="What are you gonna do now?"
                    onConfirm2={handleGoHome}
                    onConfirm={handleGoRickRoll}
                    onCancel={handleCancelRegister}
                    Button2="Go Home"
                    Button1="Go Rick Roll"
                />
            )}
        </nav>
    )

}
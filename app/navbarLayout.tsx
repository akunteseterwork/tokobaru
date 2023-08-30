import React, { useState } from 'react';
import Link from 'next/link';
import useAuth from '../utils/useAuth';
import ProfileButton from './profileButton';
import { FaShoppingBag } from 'react-icons/fa';
import { fetchWithToken } from '@/utils/fetcher';
import LoginModal from '@/components/modals/loginModal';
import RegisterModal from '@/components/modals/registerModal';
import ConfirmModal from '../components/modals/confirmModal';
import ConfirmRegisterModal from '../components/modals/confirmRegisterModal';

export default function NavbarLayout() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
    const [showSuccessRegisterModal, setShowSuccessRegisterModal] = useState(false);
    const isAuthenticated = useAuth();

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
        try {
            await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleCancelConfirmLogout = () => {
        setShowConfirmLogoutModal(false);
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
                        {isAuthenticated ? (
                            <>
                                <Link href="/orders" className="mb-2">
                                    <span className="text-grey-500 text-3xl mb-2">
                                        <FaShoppingBag className="circle-outline" />
                                    </span>
                                </Link>
                                <div className="">
                                    <ProfileButton onLogout={handleConfirmLogout} />
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
            {showConfirmLogoutModal && (
                <ConfirmModal
                    title="Logout Confirmation"
                    message="Are you sure you want to logout?"
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelConfirmLogout}
                />
            )}
            {showSuccessRegisterModal && (
                <ConfirmRegisterModal
                    title="Registration Success"
                    message="What are you gonna do now?"
                    onConfirm={handleGoHome}
                    onRickRoll={handleGoRickRoll}
                    onCancel={handleCancelRegister}
                />
            )}
        </nav>
    )

}
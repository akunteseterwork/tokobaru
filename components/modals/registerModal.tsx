import React, { useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import PopUp from './popUpModal';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface RegisterModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const { theme } = useTheme();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('fullname', fullname);
            formData.append('password', password);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setSuccessMessage('Registration successful! You can now log in.');
                onClose();
                onSuccess();
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('Please fill all the fields');
        }
    };

    return (
        <NoSSR>
        <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-800'} backdrop-blur z-50`}>
            <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} p-8 rounded-2xl shadow-md w-96 relative text-sm text-gray-700`}>
                <button onClick={onClose} className={`absolute top-4 right-4 z-10 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-500'}`}>
                    <FaTimes />
                </button>
                <h1 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>Tokobaru</h1>
                <h2 className={`text-m text-center mb-3 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>Create an account</h2>
                <form onSubmit={handleRegister}>
                    {successMessage && (
                        <p className={`text-green-500 mb-2 text-center ${theme === 'dark' ? 'text-gray-300' : ''}`}>{successMessage}</p>
                    )}
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            className={`w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500 ${theme === 'dark' ? 'bg-zinc-800 text-gray-300' : ''}`}
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="fullname"
                            className={`w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500 ${theme === 'dark' ? 'bg-zinc-800 text-gray-300' : ''}`}
                            placeholder="Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            className={`w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500 ${theme === 'dark' ? 'bg-zinc-800 text-gray-300' : ''}`}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 mt-2">
                        <label htmlFor="avatar" className={`"cursor-pointer flex justify-center space-x-2 mt-1 border-dashed border-2 rounded-xl p-2 ${theme === 'dark' ? 'text-gray-200' : ''}`}>
                            <FaUpload />
                            <span>Upload Avatar</span>
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            className="hidden"
                            required
                            onChange={(e) => setAvatar(e.target.files && e.target.files[0])}
                        />
                    </div>

                    {error && (<PopUp title="Error" message={error} />)}
                    <div className="flex justify-center">
                        <button type="submit" onClick={handleRegister} className={`bg-blue-500 text-gray-200 px-4 py-2 rounded-xl ${theme === 'dark' ? 'hover:bg-blue-600' : ''}`}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </NoSSR>
    );
};

export default RegisterModal;

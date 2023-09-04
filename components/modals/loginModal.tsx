import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import NoSSR from '../noSSR';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const access_token = data.data.access_token;
        document.cookie = `access_token=${access_token}; path=/`;
        router.push('/');
        onClose();
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <NoSSR>
      <div className={`fixed inset-0 flex justify-center items-center bg-opacity-60 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} backdrop-blur z-50`}>
        <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} p-8 rounded-2xl shadow-md w-96 relative text-sm text-gray-700`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-10 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}
          >
            <FaTimes />
          </button>
          <h1 className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>Tokobaru</h1>
          <h2 className={`text-m text-center mb-3 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-700'}`}>
            Log in to your account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                className={`w-full p-2 border border-gray-300 rounded-xl placeholder-zinc-500 ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className={`text-red-500 mb-3 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-blue-500 text-gray-100 px-4 py-2 rounded-xl ${theme === 'dark' ? 'hover:bg-blue-600' : ''}`}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </NoSSR>
  );
};

export default LoginModal;

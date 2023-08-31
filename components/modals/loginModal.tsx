import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 bg-gray-800 backdrop-blur z-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500"
        >
          <FaTimes />
        </button>
        <h1 className="text-2xl font-bold text-center mb-3">Tokobaru</h1>
        <h2 className="text-m font-semibold text-center mb-3">
          Log in to your account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-xl placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-3 text-center text-sm">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

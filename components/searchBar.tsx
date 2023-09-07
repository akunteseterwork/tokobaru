import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from 'next-themes';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("bg-gray-100");
      document.body.classList.add("dark", "bg-zinc-800", "font-inter");
    } else {
      document.body.classList.remove("dark", "bg-zinc-800", "font-inter");
      document.body.classList.add("bg-gray-100");
    }
  }, [theme]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSearch(searchQuery);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 ml-2 relative flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className={`px-1 py-1 text-sm p-8 border ${theme === 'dark' ? 'border-zinc-600' : 'border-gray-300'} rounded-lg w-52`}
      />
      {isLoading ? (
        <div className="relative ml-2 cursor-pointer">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500 border-opacity-50"></div>
        </div>
      ) : (
        <FaSearch
          className={`relative ml-2 cursor-pointer ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
          onClick={handleSearch}
        />
      )}
    </div>
  );
};

export default SearchBar;

import React, { useState } from "react";
import useSWR from "swr";
import { fetchData } from "@/utils/fetcher";
import { FaChevronCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';

const SidebarSection: React.FC<{ isExpanded: boolean; setIsExpanded: (value: boolean) => void }> = ({ isExpanded, setIsExpanded }) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/categories`, fetchData);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const router = useRouter();
  const { theme } = useTheme();

  const handleCategoryClick = (categoryId: number | "all") => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      router.push("/");
    } else {
      router.push(`/category/${categoryId}`);
    }
  };

  if (error) return <div>Error loading categories</div>;
  if (!data) return <div>Loading categories...</div>;

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center mb-4 text-xl text-${theme === 'dark' ? 'white' : 'gray-800'} font-semibold`}
      >
        Categories
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ml-2 transition-transform transform ${isExpanded ? "rotate-180" : "rotate-0"
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className={`text-${theme === 'dark' ? 'white' : 'black'} text-xs`}>
          <div
            className={`expand flex items-center mb-2 ${selectedCategory === "all" ? "selected" : ""}`}
            onClick={() => handleCategoryClick("all")}
          >
            <FaChevronCircleRight className="mr-2" />
            <span className={`font-semibold text-sm ${selectedCategory === "all" ? "selected" : ""}`}>All</span>
          </div>
          {data.data.map((category: any, index: number) => (
            <div
              key={category.id}
              className={`expand flex items-center mb-2 ${selectedCategory === category.id ? "selected" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <FaChevronCircleRight className="mr-2" />
              <span className={`font-semibold text-sm ${selectedCategory === category.id ? "selected" : ""}`}>{category.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;

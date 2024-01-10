"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Korrigera importen här

interface Category {
  databaseId: number;
  name: string;
}

interface FilterCategoryProps {
  categories: Category[];
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (name: string) => {
    router.push(`/?categoryId=${name}`);
  };

  return (
    <div>
      {categories.map(category => (
        <button
          key={category.name}
          onClick={() => handleCategoryClick(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterCategory;

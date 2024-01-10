"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  databaseId: any;
  name: any;
  
}

interface FilterCategoryProps {
  categories: Category[];
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ categories }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryId:number) => {
    // Uppdatera URL'en med den valda kategorin
    router.push(`/?categoryId=${categoryId}`);
  };

  return (
    <div>
      {categories.map(category => (
        <button
          key={category.name}
          onClick={() => handleCategoryClick(category.databaseId)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterCategory;

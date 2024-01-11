//src/app/components/FilterCategory.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  databaseId: number;
  name: string;
  
}

interface FilterCategoryProps {
  categories: Category[]; 
}



const FilterCategory: React.FC<FilterCategoryProps> = ({ categories }) => {
    const router = useRouter();
  
    const handleCategoryClick = (databaseId: number) => {
      // Uppdatera URL'en med det valda databaseId
      router.push(`/?categoryId=${databaseId}`);
    };
  
    return (
      <div>
        {categories.map(category => (
          <button
            key={category.databaseId}
            onClick={() => handleCategoryClick(category.databaseId)}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  };
  

export default FilterCategory;

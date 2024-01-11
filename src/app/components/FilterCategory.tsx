// Använder "use client" för att indikera att komponenten endast ska köras i klientmiljön
"use client"
// Importerar nödvändiga React-komponenter och hooks
import React from 'react';
// Använder useRouter från Next.js för att hantera routing
import { useRouter } from 'next/navigation';

// Definierar en TypeScript interface för kategorier
interface Category {
  databaseId: number;
  name: string;
}

// Definierar props för FilterCategory komponenten
interface FilterCategoryProps {
  categories: Category[]; 
}

// Skapar FilterCategory komponenten som tar emot kategorier som props
const FilterCategory: React.FC<FilterCategoryProps> = ({ categories }) => {
    // Använder useRouter hook för att få tillgång till routing-funktioner
    const router = useRouter();
  
    // Hanterar klick på en kategori och navigerar till den valda kategorins sida
    const handleCategoryClick = (databaseId: number) => {
      // Uppdaterar URL'en med det valda databaseId
      router.push(`/?categoryId=${databaseId}`);
    };
  
    // Renderar knappar för varje kategori
    return (
      <div>
        {categories.map(category => (
          // Skapar en knapp för varje kategori och definierar en unik nyckel och en händelsehanterare
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
  
// Exporterar komponenten för användning i andra delar av applikationen
export default FilterCategory;

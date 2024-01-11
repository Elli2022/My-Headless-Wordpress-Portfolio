// Använder "use client" för att indikera att komponenten endast ska köras i klientmiljön
"use client";
// Importerar nödvändiga React-komponenter och hooks
import React from "react";
// Använder useRouter från Next.js för att hantera routing
import { useRouter } from "next/navigation";

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
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.databaseId}
          onClick={() => handleCategoryClick(category.databaseId)}
          // Responsiva Tailwind-klasser för att justera storlek och padding
          className="mb-2 font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl px-4 py-2 text-center text-black bg-transparent rounded-md focus:outline-none focus:ring focus:ring-blue-300 hover:bg-blue-100"
        >
          {category.name}
        </button>
      ))}
    </div>

  );
};

// Exporterar komponenten för användning i andra delar av applikationen
export default FilterCategory;

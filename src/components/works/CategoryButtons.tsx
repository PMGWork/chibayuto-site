"use client";

import type { SanityValues } from '../../../sanity.config';

type Category = SanityValues['category'];

interface CategoryButtonsProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
};

export default function CategoryButtons({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryButtonsProps) {
  return (
    <div
      className="
        flex flex-wrap gap-2 mt-4
        text-xs sm:text-sm cursor-pointer
      "
    >
      <button
        className={`px-2 py-1 rounded cursor-pointer ${selectedCategory === null ? 'bg-cyan-600 text-white' : 'bg-gray-50 border-gray-200 border'}`}
        onClick={() => onSelectCategory(null)}
      >
        全て
      </button>
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-2 py-1 rounded cursor-pointer ${selectedCategory?.slug?.current === category.slug?.current ? 'bg-cyan-600 text-white' : 'bg-gray-50 border-gray-200 border'}`}
          onClick={() => onSelectCategory(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
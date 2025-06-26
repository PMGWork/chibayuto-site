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
  // ボタンのクラスを取得
  const getButtonClass = (isSelected: boolean) => {
    const baseClass =
      "relative rounded text-right group-hover:text-foreground " +
      "transition-all duration-300 ease-in-out cursor-pointer";
    const selectedClass = "mr-2 text-foreground";
    const unselectedClass = "text-gray-500";

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  // 線のクラスを取得
  const getLineClass = (isSelected: boolean) => {
    const baseClass =
      "h-0.5 w-0 bg-gray-400 rounded-full " +
      "transition-all duration-300 ease-in-out";
    return `${baseClass} ${isSelected ? 'w-2' : ''}`;
  };

  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex gap-2 items-center justify-end group">
        <div className={getLineClass(selectedCategory === null)}>
        </div>
        <button
          className={getButtonClass(selectedCategory === null)}
          onClick={() => onSelectCategory(null)}
        >
          全て
        </button>
      </div>
      {categories.map((category, index) => (
        <div key={index} className="flex gap-2 items-center justify-end group">
          <div className={getLineClass(selectedCategory?.name === category.name)}>
          </div>
          <button
            className={getButtonClass(selectedCategory?.name === category.name)}
            onClick={() => onSelectCategory(category)}
          >
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
}
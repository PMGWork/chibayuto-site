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
  // ボタンのクラスを取得（デスクトップ用）
  const getDesktopButtonClass = (isSelected: boolean) => {
    const baseClass =
      "relative rounded text-right hover:text-foreground hover:mr-2 " +
      "transition-all duration-300 ease-in-out cursor-pointer py-1 pl-1";
    const selectedClass = "mr-2 text-foreground";
    const unselectedClass = "text-gray-500";

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  // ボタンのクラスを取得（モバイル用）
  const getMobileButtonClass = (isSelected: boolean) => {
    const baseClass =
      "px-3 py-1 rounded-full text-body-sm " +
      "transition-all duration-300 ease-in-out cursor-pointer";
    const selectedClass =
      "bg-cyan-600 text-background border border-cyan-600";
    const unselectedClass =
      "bg-background text-gray-500 border border-gray-200 " +
      "hover:border-cyan-600";

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  // 線のクラスを取得（デスクトップ用）
  const getLineClass = (isSelected: boolean) => {
    const baseClass =
      "h-0.5 w-0 bg-cyan-600 rounded-full " +
      "transition-all duration-300 ease-in-out";
    return `${baseClass} ${isSelected ? 'w-2' : ''}`;
  };

  return (
    <>
      {/* モバイル用 */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-2">
          <button
            className={getMobileButtonClass(selectedCategory === null)}
            onClick={() => onSelectCategory(null)}
          >
            すべて
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className={getMobileButtonClass(selectedCategory?.name === category.name)}
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* デスクトップ用 */}
      <div className="hidden lg:flex flex-col gap-2 items-end">
        <div className="flex gap-2 items-center justify-end group">
          <div className={getLineClass(selectedCategory === null)}>
          </div>
          <button
            className={getDesktopButtonClass(selectedCategory === null)}
            onClick={() => onSelectCategory(null)}
          >
            すべて
          </button>
        </div>
        {categories.map((category, index) => (
          <div key={index} className="flex gap-2 items-center justify-end group">
            <div className={getLineClass(selectedCategory?.name === category.name)}>
            </div>
            <button
              className={getDesktopButtonClass(selectedCategory?.name === category.name)}
              onClick={() => onSelectCategory(category)}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
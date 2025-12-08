'use client';

interface CategoryButtonsProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function CategoryButtons({
  tags,
  selectedTag,
  onSelectTag,
}: CategoryButtonsProps) {
  // ボタンのクラスを取得
  const getButtonClass = (isSelected: boolean) => {
    const baseClass =
      'px-3 sm:px-4 py-1 corner-full text-sm sm:text-body-sm ' +
      'transition-all duration-300 ease-in-out cursor-pointer';
    const selectedClass = 'bg-primary text-background border border-primary';
    const unselectedClass =
      'bg-background text-gray-600 border border-gray-200 ' +
      'hover:border-primary';

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  return (
    <>
      {/* モバイル用 */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-2">
          <button
            className={getButtonClass(selectedTag === null)}
            onClick={() => onSelectTag(null)}
          >
            すべて
          </button>
          {tags.map((tag, index) => (
            <button
              key={index}
              className={getButtonClass(selectedTag === tag)}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* デスクトップ用 */}
      <div className="hidden flex-col items-end gap-2 lg:flex">
        <button
          className={getButtonClass(selectedTag === null)}
          onClick={() => onSelectTag(null)}
        >
          すべて
        </button>
        {tags.map((tag, index) => (
          <button
            key={index}
            className={getButtonClass(selectedTag === tag)}
            onClick={() => onSelectTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}

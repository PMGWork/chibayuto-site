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
  // ボタンのクラスを取得（デスクトップ用）
  const getDesktopButtonClass = (isSelected: boolean) => {
    const baseClass =
      'relative rounded text-right hover:text-foreground hover:mr-2 ' +
      'transition-all duration-300 ease-in-out cursor-pointer py-1 pl-1';
    const selectedClass = 'mr-2 text-foreground';
    const unselectedClass = 'text-gray-500';

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  // ボタンのクラスを取得（モバイル用）
  const getMobileButtonClass = (isSelected: boolean) => {
    const baseClass =
      'px-3 py-1 rounded-full text-body-sm ' +
      'transition-all duration-300 ease-in-out cursor-pointer';
    const selectedClass = 'bg-primary text-background border border-primary';
    const unselectedClass =
      'bg-background text-gray-500 border border-gray-200 ' +
      'hover:border-primary';

    return `${baseClass} ${isSelected ? selectedClass : unselectedClass}`;
  };

  // 線のクラスを取得（デスクトップ用）
  const getLineClass = (isSelected: boolean) => {
    const baseClass =
      'h-0.5 w-0 bg-primary rounded-full ' +
      'transition-all duration-300 ease-in-out';
    return `${baseClass} ${isSelected ? 'w-2' : ''}`;
  };

  return (
    <>
      {/* モバイル用 */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-2">
          <button
            className={getMobileButtonClass(selectedTag === null)}
            onClick={() => onSelectTag(null)}
          >
            すべて
          </button>
          {tags.map((tag, index) => (
            <button
              key={index}
              className={getMobileButtonClass(selectedTag === tag)}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* デスクトップ用 */}
      <div className="hidden flex-col items-end gap-2 lg:flex">
        <div className="group flex items-center justify-end gap-2">
          <div className={getLineClass(selectedTag === null)}></div>
          <button
            className={getDesktopButtonClass(selectedTag === null)}
            onClick={() => onSelectTag(null)}
          >
            すべて
          </button>
        </div>
        {tags.map((tag, index) => (
          <div
            key={index}
            className="group flex items-center justify-end gap-2"
          >
            <div className={getLineClass(selectedTag === tag)}></div>
            <button
              className={getDesktopButtonClass(selectedTag === tag)}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

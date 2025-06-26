"use client";

import { useState } from 'react';
import type { SanityValues } from '../../../sanity.config';
import type { ThumbnailValue } from '../../types';

import WorkCard from './WorkCard';
import CategoryButtons from './CategoryButtons';

type Category = SanityValues['category'];
type Work = Omit<SanityValues['work'], 'categories'> & {
  categories?: Category[];
  thumbnail?: ThumbnailValue;
};

interface WorkListProps {
  initialCategories: Category[];
  initialWorks: Work[];
}

export default function WorkList({ initialCategories, initialWorks }: WorkListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredWorks: Work[] = selectedCategory
    ? initialWorks.filter((work: Work) =>
        Array.isArray(work.categories) &&
        work.categories.some((category: Category) =>
          category.slug?.current === selectedCategory?.slug?.current)
      )
    : initialWorks;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-16 justify-between">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {filteredWorks.map((work, index) => (
            <WorkCard key={index} work={work} />
          ))}
        </div>
      </div>

      <div className="lg:w-36">
        <div className="lg:sticky lg:top-40 w-32 lg:ml-auto">
          <CategoryButtons
            categories={initialCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
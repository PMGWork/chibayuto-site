"use client";

import { useState, useRef } from 'react';

import WorkCard from './WorkCard';
import CategoryButtons from './CategoryButtons';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { Work } from '../../types/work';

interface WorkListProps {
  initialTags: string[];
  initialWorks: Work[];
}

interface WorkItemProps {
  work: Work;
  index: number;
}

function WorkItem({ work, index }: WorkItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    threshold: 0.1,
    rootMargin: '0px 0px 40% 0px',
  });

  return (
    <div
      ref={ref}
      className="transition-all duration-[1500ms] transform"
      style={{
        transitionDelay: `${index * 75}ms`,
        transitionTimingFunction: 'cubic-bezier(.1,1,.3,1)',
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <WorkCard work={work} />
    </div>
  );
}

export default function WorkList({ initialTags, initialWorks }: WorkListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredWorks: Work[] = selectedTag
    ? initialWorks.filter((work: Work) =>
      work.data.tags?.some((tag: string) =>
        tag === selectedTag)
    )
    : initialWorks;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* モバイル・タブレット用：上部にカテゴリボタン */}
      <div className="lg:hidden">
        <CategoryButtons
          tags={initialTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-16 justify-between">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWorks.map((work, index) => (
              <WorkItem
                key={`${selectedTag || 'all'}-${work.id || index}`}
                work={work}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* デスクトップ用：右側にカテゴリボタン */}
        <div className="hidden lg:block lg:w-32">
          <div className="lg:sticky lg:top-40 lg:ml-auto">
            <CategoryButtons
              tags={initialTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

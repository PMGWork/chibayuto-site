"use client";

import { useState } from "react";
import PortableTextComponents from './PortableTextComponent';
import TableOfContents from './TableOfContents';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface WorkContentProps {
  content: any;
}

export default function WorkContent({ content }: WorkContentProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  return (
    <div className="flex gap-16">
      {/* メインコンテンツ */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-4">
          <PortableTextComponents
            value={content}
            onHeadingsChange={setHeadings}
          />
        </div>
      </div>

      {/* 目次 */}
      {headings.length > 0 && (
        <div className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents headings={headings} />
        </div>
      )}
    </div>
  );
}
"use client";

import { PortableText } from "@portabletext/react";
import { useMemo, useEffect } from "react";

import { ImageGroupComponent } from "./ImageGroupComponent";
import EmbedComponent from "./EmbedContent";

import type { ImageGroupValue, EmbedValue } from "../../types";

interface ProtableTextComponentProps {
  value: any;
  onHeadingsChange?: (headings: Array<{id: string, text: string, level: number}>) => void;
}

// テキストからIDを生成する関数（日本語対応）
function generateId(text: string): string {
  const id = text
    .trim()
    .replace(/\s+/g, '-')  // スペースをハイフンに
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF-]/g, '')  // 日本語文字とアルファベット、数字のみ残す
    .toLowerCase()
    .slice(0, 50);  // 長すぎる場合は短縮

  // 空の場合はランダムIDを生成
  return id || `heading-${Math.random().toString(36).substr(2, 9)}`;
}

// 見出し要素のテキストを抽出する関数
function extractText(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children?.props?.children) {
    return extractText(children.props.children);
  }
  return '';
}

export default function PortableTextComponent({ value, onHeadingsChange }: ProtableTextComponentProps) {
  // 見出し要素を抽出
  const headings = useMemo(() => {
    const headingsList: Array<{id: string, text: string, level: number}> = [];

    if (Array.isArray(value)) {
      value.forEach((block) => {
        if (block._type === 'block' && ['h1', 'h2', 'h3', 'h4'].includes(block.style)) {
          const text = block.children?.map((child: any) => child.text).join('') || '';
          if (text.trim()) {
            const id = generateId(text);
            const level = parseInt(block.style.replace('h', ''));
            headingsList.push({ id, text, level });
          }
        }
      });
    }

    return headingsList;
  }, [value]);

  // 見出し情報を親コンポーネントに送る（DOM要素がレンダリングされた後）
  useEffect(() => {
    if (onHeadingsChange) {
      // DOM要素がレンダリングされるまで少し待つ
      const timer = setTimeout(() => {
        onHeadingsChange(headings);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [headings, onHeadingsChange]);

  return (
    <PortableText
      value={value}
      components={{
        block: {
          h1: ({children}) => {
            const text = extractText(children);
            const id = generateId(text);
            return (
              <h1 id={id} className="text-3xl sm:text-4xl font-bold mt-8 mb-4 w-full">
                {children}
              </h1>
            );
          },
          h2: ({children}) => {
            const text = extractText(children);
            const id = generateId(text);
            return (
              <h2 id={id} className="text-2xl sm:text-3xl font-semibold mt-7 mb-3 w-full">
                {children}
              </h2>
            );
          },
          h3: ({children}) => {
            const text = extractText(children);
            const id = generateId(text);
            return (
              <h3 id={id} className="text-xl sm:text-2xl font-medium mt-6 mb-2 w-full">
                {children}
              </h3>
            );
          },
          h4: ({children}) => {
            const text = extractText(children);
            const id = generateId(text);
            return (
              <h4 id={id} className="text-lg sm:text-xl font-medium mt-5 mb-2 w-full">
                {children}
              </h4>
            );
          },
          normal: ({children}) => (
            <p className="mb-2 w-full">
              {children}
            </p>
          )
        },
        types: {
          imageGroup: ({value}: {value: ImageGroupValue}) => {
            return <ImageGroupComponent value={value} />;
          },
          embed: ({value}: {value: EmbedValue}) => {
            const { url } = value;
            if (!url) return null;

            return <EmbedComponent url={url} />;
          }
        }
      }}
    />
  );
}
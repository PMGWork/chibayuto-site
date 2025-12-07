import { visit } from 'unist-util-visit';
import path from 'path';
import type { Root, Text, Image, RootContent } from 'mdast';
import type { Plugin } from 'unified';
import type { VFile } from 'vfile';

/**
 * Obsidianのリンク形式 ![[filename]] を標準のMarkdown ![](path) に変換するremarkプラグイン
 */
const remarkImages: Plugin<[], Root> = () => {
  return (tree: Root, file: VFile) => {
    const docName = file.path
      ? path.basename(file.path, path.extname(file.path))
      : '';

    // テキストノードを検索
    visit(tree, 'text', (node: Text, index, parent) => {
      if (typeof index !== 'number' || !parent) return;

      // テキストを取得
      const text = node.value;

      // ![[filename.ext]] のパターンにマッチするか
      const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;
      if (!obsidianImageRegex.test(text)) return;

      // マッチした部分を置換
      const parts: RootContent[] = [];
      let lastIndex = 0;
      const matches = text.matchAll(/!\[\[([^\]]+)\]\]/g);

      // マッチした部分を順番に処理
      for (const match of matches) {
        const fullMatch = match[0];
        const filename = match[1];
        const matchIndex = match.index;

        // マッチ前のテキストを追加
        if (matchIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: text.substring(lastIndex, matchIndex),
          } as Text);
        }

        // 画像ノードを追加
        const imagePath = `./assets/${docName}/${filename}`;

        parts.push({
          type: 'image',
          url: imagePath,
          alt: filename.replace(/\.\w+$/, ''),
        } as Image);

        lastIndex = matchIndex + fullMatch.length;
      }

      // 残りのテキストを追加
      if (lastIndex < text.length) {
        parts.push({
          type: 'text',
          value: text.substring(lastIndex),
        } as Text);
      }

      // 元のノードを置き換え
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });
  };
};

export default remarkImages;

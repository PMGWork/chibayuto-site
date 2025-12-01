import { visit } from 'unist-util-visit';

/**
 * Obsidianのリンク形式 ![[filename]] を標準のMarkdown ![](path) に変換するremarkプラグイン
 */
export default function remarkObsidianImages() {
  return (tree, file) => {
    visit(tree, 'text', (node, index, parent) => {
      const text = node.value;

      // ![[filename.ext]] のパターンにマッチ
      const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;

      if (!obsidianImageRegex.test(text)) {
        return;
      }

      // マッチした部分を置換
      const parts = [];
      let lastIndex = 0;
      const matches = text.matchAll(/!\[\[([^\]]+)\]\]/g);

      for (const match of matches) {
        const fullMatch = match[0];
        const filename = match[1];
        const matchIndex = match.index;

        // マッチ前のテキストを追加
        if (matchIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: text.substring(lastIndex, matchIndex)
          });
        }

        // 画像ノードを追加
        const imagePath = `./assets/超すごい時間割/${filename}`;

        parts.push({
          type: 'image',
          url: imagePath,
          alt: filename.replace(/\.\w+$/, ''),
        });

        lastIndex = matchIndex + fullMatch.length;
      }

      // 残りのテキストを追加
      if (lastIndex < text.length) {
        parts.push({
          type: 'text',
          value: text.substring(lastIndex)
        });
      }

      // 元のノードを置き換え
      if (parts.length > 0 && parent && typeof index === 'number') {
        parent.children.splice(index, 1, ...parts);
      }
    });
  };
}

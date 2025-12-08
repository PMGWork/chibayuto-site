import { visit } from 'unist-util-visit';
import type { Root, Element, Text } from 'hast';
import type { Plugin } from 'unified';

type HastNode = Element | Text;

/**
 * 連続する画像のみのパラグラフを検出し、グリッドレイアウトのdivでラップするrehypeプラグイン
 */
const rehypeImageGrid: Plugin<[], Root> = () => {
  return (tree: Root) => {
    // すべてのelementノードを検索
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (node.tagName !== 'p') return;
      if (!isImageParagraph(node)) return;

      // 親要素の子要素を取得
      const siblings = parent.children as HastNode[];

      // 前の要素が画像パラグラフの場合は、すでに処理済み（グループの一部）なのでスキップ
      const prev = siblings[index - 1];
      if (prev && isImageParagraph(prev)) return;

      // ここから後ろにいくつ画像パラグラフが続くか数える
      let endIndex = index + 1;
      const targetNodes: HastNode[] = [node];

      while (endIndex < siblings.length) {
        const sibling = siblings[endIndex];

        if (isImageParagraph(sibling)) {
          targetNodes.push(sibling);
          endIndex++;
        } else if (isEmptyText(sibling)) {
          // 画像間の空白テキスト（改行など）はグループに含める候補とする
          targetNodes.push(sibling);
          endIndex++;
        } else {
          break;
        }
      }

      // 末尾が空白テキストで終わっている場合、それはグループに含めない
      while (
        targetNodes.length > 0 &&
        !isImageParagraph(targetNodes[targetNodes.length - 1])
      ) {
        targetNodes.pop();
        endIndex--;
      }

      // 実際に画像パラグラフが2つ以上あるか確認
      const imageParagraphs = targetNodes.filter(isImageParagraph) as Element[];
      if (imageParagraphs.length < 2) return;

      // グループ化実行

      // 1. 画像を取り出し、スタイルを適用
      const images: Element[] = [];
      imageParagraphs.forEach((p) => {
        const img = p.children.find(
          (c): c is Element => c.type === 'element' && c.tagName === 'img',
        );
        if (img) {
          if (!img.properties) img.properties = {};

          const existingClass = img.properties.className;
          const newClasses: string[] = Array.isArray(existingClass)
            ? existingClass.filter((c): c is string => typeof c === 'string')
            : typeof existingClass === 'string'
              ? [existingClass]
              : [];

          if (!newClasses.includes('corner-lg')) newClasses.push('corner-lg');
          if (!newClasses.includes('w-full')) newClasses.push('w-full');
          if (!newClasses.includes('h-auto')) newClasses.push('h-auto');
          if (!newClasses.includes('object-cover'))
            newClasses.push('object-cover');
          // proseのスタイルを打ち消すためにマージンとパディングを0にする
          if (!newClasses.includes('!m-0')) newClasses.push('!m-0');
          if (!newClasses.includes('!p-0')) newClasses.push('!p-0');

          img.properties.className = newClasses;

          images.push(img);
        }
      });

      // 2. ラッパー作成
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'my-8'],
        },
        children: images,
      };

      // 3. 置換
      parent.children.splice(index, endIndex - index, wrapper);

      // 4. indexの調整
      return index + 1;
    });
  };
};

// 画像パラグラフかどうかを判定するヘルパー関数
function isImageParagraph(node: HastNode): node is Element {
  if (node.type !== 'element' || node.tagName !== 'p') return false;

  const children = node.children || [];
  const hasImg = children.some(
    (c) => c.type === 'element' && c.tagName === 'img',
  );
  if (!hasImg) return false;

  // img以外の要素（テキストなど）が含まれていないかチェック
  const hasNonEmptyText = children.some((c) => {
    if (c.type === 'text') {
      return c.value.trim() !== '';
    }
    if (c.type === 'element' && c.tagName !== 'img') {
      return true;
    }
    return false;
  });

  return !hasNonEmptyText;
}

// 空白テキストかどうかを判定するヘルパー関数
function isEmptyText(node: HastNode): node is Text {
  return node.type === 'text' && node.value.trim() === '';
}

export default rehypeImageGrid;

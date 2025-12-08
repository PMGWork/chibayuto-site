import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';

/**
 * table内のリンクに target="_blank" と rel="noopener noreferrer" を追加するrehypeプラグイン
 */
const rehypeTableLinks: Plugin<[], Root> = () => {
  return (tree: Root) => {
    let insideTable = false;

    visit(tree, 'element', (node: Element) => {
      // テーブル要素に入った場合
      if (node.tagName === 'table') {
        insideTable = true;
      }

      // テーブル内のリンクを処理
      if (insideTable && node.tagName === 'a') {
        if (!node.properties) node.properties = {};
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
    });
  };
};

export default rehypeTableLinks;

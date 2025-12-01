import { visit } from 'unist-util-visit';

/**
 * 最初のObsidian形式の画像リンク ![[filename]] を削除するremarkプラグイン
 * サムネイルとして使用される画像を本文から除外するために使用
 */
export default function remarkRemoveFirstImage() {
  return (tree) => {
    let found = false;

    visit(tree, 'text', (node, index, parent) => {
      if (found) return;

      const regex = /!\[\[([^\]]+)\]\]/;
      if (regex.test(node.value)) {
        // マッチした部分を削除
        node.value = node.value.replace(regex, '');
        found = true;
      }
    });
  };
}

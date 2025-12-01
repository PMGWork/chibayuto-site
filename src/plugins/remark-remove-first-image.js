import { visit } from 'unist-util-visit';

/**
 * 最初のObsidian形式の画像リンク ![[filename]] を削除するremarkプラグイン
 * サムネイルとして使用される画像を本文から除外するために使用
 * 画像削除後に空になったパラグラフも削除する
 */
export default function remarkRemoveFirstImage() {
  return (tree) => {
    let found = false;

    visit(tree, 'paragraph', (node, index, parent) => {
      if (found) return;

      // パラグラフ内のテキストノードを探索
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'text') {
          const regex = /!\[\[([^\]]+)\]\]/;
          if (regex.test(child.value)) {
            // マッチした部分を削除
            child.value = child.value.replace(regex, '');
            found = true;

            // テキストノードが空（または空白のみ）になった場合
            if (!child.value.trim()) {
              // 空のテキストノードを削除
              node.children.splice(i, 1);
            }

            // パラグラフが空になったかチェック（子要素がない、または全て空のテキスト）
            const isParagraphEmpty = node.children.length === 0 || node.children.every(c =>
              c.type === 'text' && !c.value.trim()
            );

            if (isParagraphEmpty && parent) {
              // 親からこのパラグラフを削除
              parent.children.splice(index, 1);
              // 削除したので、インデックスを調整してトラバーサルを継続
              return index;
            }

            // 見つかったのでループを抜ける
            break;
          }
        }
      }
    });
  };
}

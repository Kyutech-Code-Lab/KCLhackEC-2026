# PPTX 修正案

作成日: 2026-06-13

PPTX本体はここでは修正していません。以下は、スライド側でそのまま直すための具体案です。

## 全体方針

- `kcl-frontend-intro.pptx`: React / Next.js の基本概念をさらう導入スライドとして使う
- `kcl-frontend-2026-handson-ans.pptx`: ハンズオンを進めながら、各Phaseの説明と答え合わせに使う
- 2026年版の本編は Phase 1-6。カート・お気に入りは Bonus、注文フォームは本編外

## `kcl-frontend-intro.pptx`

### スライド番号

現状:

- 抽出上は全19枚
- フッターは `1 / 18` から `18 / 18` になっている

修正案:

- 19枚構成で使うなら、全スライドのフッターを `1 / 19` から `19 / 19` に変更する
- 18枚構成にしたいなら、スライド18か19のどちらかを削って番号を `1 / 18` から `18 / 18` に揃える

おすすめ:

- 19枚構成のまま、番号だけ `全19枚` に直す

### スライド13: `useState` と絞り込み

現状の問題:

- `const filtered = filterProducts(...)` のように、render中に直接計算する例になっている
- 現行ハンズオン本編は `filteredProducts` state を持ち、Phase 5で `useEffect` から更新する流れ

修正案:

タイトル:

```text
STEP 4  複数の state を使う
検索条件と表示結果を分けて管理する
```

左側コード:

```tsx
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("すべて");
const [filteredProducts, setFilteredProducts] =
  useState<Product[]>(products);
```

右側コード:

```ts
export function filterProducts(
  products: Product[],
  searchTerm: string,
  selectedCategory: string,
) {
  return products.filter((product) => {
    const matchesSearch =
      product.name.includes(searchTerm) ||
      product.description.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "すべて" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}
```

説明文:

```text
searchTerm と selectedCategory は入力・選択の状態。
filteredProducts は、今画面に表示する商品一覧。
検索条件が変わったら、次のSTEPで useEffect を使って表示結果を更新する。
```

### スライド14: `useEffect`

現状は大きく間違っていません。スライド13を上の案に変えるなら、スライド14は次のコードに揃えると流れがきれいです。

差し替えコード:

```tsx
useEffect(() => {
  setFilteredProducts(
    filterProducts(products, searchTerm, selectedCategory),
  );
}, [searchTerm, selectedCategory]);
```

補足文:

```text
今回は useEffect の役割を学ぶために、
検索条件が変わったあとで filteredProducts を更新する形にしている。
```

### スライド17: 詳細ページ

現状の問題:

- `notFound()` を使う例になっている
- 現行スターターは、商品が見つからない場合に独自の「商品が見つかりませんでした」画面を返す

修正案A: 本編コードに揃える

```tsx
type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main>
        <h1>商品が見つかりませんでした</h1>
        <Link href="/">商品一覧に戻る</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{formatPrice(product.price)}</p>
    </main>
  );
}
```

修正案B: `notFound()` 紹介として残す

この場合は、スライド内に次の注記を入れる。

```text
補足: Next.js では notFound() で404ページを表示できる。
今回のスターターでは、初心者が流れを追いやすいように独自の「見つかりません」画面を返している。
```

おすすめ:

- 導入スライドなら案A。本編との差分が少なく、参加者が迷いにくい

### スライド18: ハンズオン Phase

現状の問題:

- `Phase 1 〜 8`
- `7 カートとお気に入り`
- `8 注文フォームの state`
- 現行本編は Phase 1-6。カート・お気に入りは Bonus、注文フォームは本編外

修正案:

タイトル:

```text
ハンズオン
Phase 1 〜 6 を順番に進めよう
```

本文:

```text
1 型とデータを読む・追加する
  product.ts, products.ts

2 ProductCard を完成させる
  説明・価格・評価・在庫を表示

3 map で一覧表示する
  ProductList.tsx

4 useState を確認する
  searchTerm / selectedCategory / filteredProducts

5 useEffect で絞り込みを動かす
  productFilters.ts, page.tsx

6 詳細ページを完成させる
  products/[id]/page.tsx

Bonus カートとお気に入り
  配列 state と localStorage を読む
```

削る文言:

```text
注文フォームの state
```

### スライド19: completeブランチ

現状の問題:

- `詰まったら complete ブランチで答え合わせ` とある
- 現在の資料に complete ブランチ運用の説明がない

修正案A: completeブランチを使わない

```text
詰まったら 01-participant-handson.md と 03-challenge-answers.md を見て確認しよう
```

修正案B: completeブランチを使う

スライド文言:

```text
詰まったら complete ブランチで答え合わせ
```

READMEまたは講師ガイドに追記する文言:

```text
答え合わせ用に complete ブランチを用意しています。
自分の作業内容を残したい場合は、ブランチを切り替える前に commit または stash してください。
```

おすすめ:

- 現時点では案A。ブランチ運用を増やすと初心者サポートの負荷が上がる

## `kcl-frontend-2026-handson-ans.pptx`

### スライド18: 参照ファイル名

現状:

```text
03-challenges.md
98-challenge-answers.md
```

修正案:

```text
02-challenges.md
03-challenge-answers.md
```

スライド内の該当ブロック差し替え案:

```text
参加者が見るもの
• 01-participant-handson.md
• 02-challenges.md
• web の TODO / Phase コメント

メンターが見るもの
• 03-challenge-answers.md
• 99-instructor-guide.md
• この PowerPoint deck
```

### Answerスライドの扱い

対象:

- スライド7: `Phase 1 Answer`
- スライド9: `Phase 2 Answer`
- スライド11: `Phase 3 Answer`
- スライド13: `Phase 4 Answer`
- スライド15: `Phase 5 Answer`
- スライド17: `Phase 6 Answer`

問題:

- 参加者投影用として最初から見せると、答えが先に見える
- メンター用の答え合わせデッキとしては問題ない

修正案A: メンター用として残す

表紙またはスライド1に次を追加:

```text
このデッキは講師・メンター用です。
Answerスライドは作業タイム後の答え合わせで表示します。
```

修正案B: 参加者投影用に分ける

- Answerスライドを非表示にする
- または参加者用デッキから Answerスライドを削る
- 講師用には `kcl-frontend-2026-handson-ans.pptx` として残す

おすすめ:

- 当日は案Aで運用し、Answerスライドを作業タイム後にだけ表示する

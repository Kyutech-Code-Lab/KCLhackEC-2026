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
done

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

最新確認日: 2026-06-13

ページ番号は未確認対象から外しています。

結論:

- Phase 1-6 の流れは `web` の現行コードと概ね合っています。
- PPTXの内容に沿って `web` を完成状態にしたところ、lint/typecheck/build とブラウザ操作検証は通りました。
- ただし、参加者がスライドのコードをそのまま写すと詰まり得る箇所が4点あります。

### スライド3: Phase 1 Answer

現状:

```text
imageUrl: "https://example.com/image.jpg",
```

問題:

- このURLをそのまま使うと画像が表示されません。
- 「答えの形」としては問題ありませんが、ハンズオン中にそのまま写す参加者がいると、画像表示で詰まります。

修正案:

```text
imageUrl: "https://picsum.photos/id/180/300/200",
```

または、説明として次を足す:

```text
画像URLは自分で別のURLに変えてよい。
example.com は形を見せるための仮URL。
```

おすすめ:

- スライド上の答えコードは、実際に表示できるURLへ変える

### スライド7: Phase 3 Answer

現状の答えコードには、`ProductCard` に渡す必須propsの一部だけが表示されています。

現状:

```tsx
<ProductCard
  key={product.id}
  product={product}
  cartQuantity={cartItem?.quantity ?? 0}
  isFavorite={isFavorite}
/>
```

問題:

- 現行の `ProductCard` は `onAddToCart` と `onToggleFavorite` も必須です。
- 参加者がこのスニペットをそのまま写すと TypeScript エラーになります。

修正案:

```tsx
<ProductCard
  key={product.id}
  product={product}
  cartQuantity={cartItem?.quantity ?? 0}
  isFavorite={isFavorite}
  onAddToCart={onAddToCart}
  onToggleFavorite={onToggleFavorite}
/>
```

おすすめ:

- スライド7は上記の完全版にする

### スライド8: Phase 4

現状:

```text
未完成コード
```

問題:

- 現行 `web/src/app/page.tsx` では、Phase 4の3つの `useState` は既に書かれています。
- スライド内の作業タイムも「3つの state が何を覚えるかを言えるようにする」なので、実装より確認フェーズです。

修正案:

```text
確認するコード
```

または:

```text
すでに用意されているコード
```

おすすめ:

- `未完成コード` を `確認するコード` に変更する

### スライド11: Phase 5 Answer

現状:

```tsx
product.name.toLowerCase().includes(normalizedSearchTerm)
```

問題:

- スライド10では `name / description / category` の3箇所を直す作業になっています。
- Answerが `name` の1行だけだと、初心者には「description と category も同じように直す」が伝わりにくいです。

修正案:

```tsx
const matchesSearch =
  normalizedSearchTerm === "" ||
  product.name.toLowerCase().includes(normalizedSearchTerm) ||
  product.description.toLowerCase().includes(normalizedSearchTerm) ||
  product.category.toLowerCase().includes(normalizedSearchTerm);
```

おすすめ:

- スライド11は、検索条件の完成形を上記の4行で見せる

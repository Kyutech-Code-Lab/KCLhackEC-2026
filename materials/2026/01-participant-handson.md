# ハンズオン

## 今日作るもの

`KCL Shop` という小さなショッピングアプリを、TODO コメントを埋めながら作ります。

できるようになること:

- 商品データを TypeScript で読む、増やす
- 商品カードをコンポーネントとして組み立てる
- `map` で商品一覧を表示する
- `useState` で検索キーワードを管理する
- `filter` で表示する商品を絞り込む
- `Link` で詳細ページへ移動する
- 余裕があれば、お気に入りとカートの状態管理も読む

## セットアップ

必要なもの:

- Node.js `20.9.0` 以上
- npm
- VS Code などのコードエディタ

このリポジトリでは、Next.js アプリは `web` ディレクトリにあります。

```bash
cd Lecture0-NextJs/web
npm install
npm run dev
```

ブラウザで開きます。

```text
http://localhost:3000
```

止めるときは、ターミナルで `Ctrl + C` を押します。

もし `3000` 番ポートが使われていると表示されたら、ターミナルに出ている別のURLを開いてください。例: `http://localhost:3001`

## 進め方

`web` には最初から `TODO(Phase X)` や `Phase X` のコメントが入っています。その近くのコードを確認しながら、未完成の部分を埋めていきます。

進める順番:

1. `src/types/product.ts` と `src/data/products.ts`
2. `src/components/ui/ProductCard.tsx`
3. `src/components/containers/ProductList.tsx`
4. `src/app/page.tsx`
5. `src/utils/productFilters.ts`
6. `src/app/products/[id]/page.tsx`

## Phase 1: データの形を決める

見るファイル:

```text
src/types/product.ts
src/data/products.ts
```

ここでは、`Product` 型を読んでから `products` 配列に商品を追加します。

チェックポイント:

- `id` は詳細ページの URL にも使うので、他の商品と重複させない
- `price`, `stock`, `rating` は `number`
- `category` は `ProductCategory` にある候補から選ぶ
- `src/data/products.ts` には追加用テンプレートがコメントで置いてある

## Phase 2: 商品カードを作る

見るファイル:

```text
src/components/ui/ProductCard.tsx
src/components/ui/Button.tsx
src/components/ui/Badge.tsx
```

`ProductCard.tsx` には `TODO(Phase 2)` が 3 箇所あります。

埋める内容:

- `displayDescription` を `product.description` に変える
- `displayPrice` の `0` を `product.price` に変える
- `displayRating`, `displayStock` の `0` を `product.rating`, `product.stock` に変える

チェックポイント:

- `props` はコンポーネントに渡す入力
- `formatPrice` は数値を `￥6,800` のような文字列に変える
- ボタンの見た目は共通化し、押したときの処理だけ変える

## Phase 3: 商品一覧を表示する

見るファイル:

```text
src/components/containers/ProductList.tsx
```

`ProductList.tsx` には `TODO(Phase 3-1)` から `TODO(Phase 3-3)` があります。

埋める内容:

1. `products.map((_, index) => { ... })` を `products.map((product) => { ... })` に変える
2. `key={\`starter-\${index}\`}` を `key={product.id}` に変える
3. `product={products[index]!}` を `product={product}` に変える
4. `cartItems.find(...)` の空文字を `product.id` に変える
5. `favoriteIds.includes(...)` の空文字を `product.id` に変える

チェックポイント:

- `map` は「配列から新しい配列を作る」
- React では一覧表示のとき `key` が必要
- `map` の引数 `product` は「配列の中の今見ている 1 件」
- `find` は「条件に合う最初の 1 件を探す」
- `includes` は「配列にその値が入っているか」を調べる

## Phase 4: 検索欄を作る

見るファイル:

```text
src/components/containers/ProductSearch.tsx
src/app/page.tsx
```

`ProductSearch` はすでに用意されています。ここでは `page.tsx` の state とつなぐ見方に集中します。

`page.tsx` には `Phase 4-1` から `Phase 4-3` のコメントがあります。

ここでは次の 3 行が、それぞれ何を覚えているかを確認します。

```tsx
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("すべて");
const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
```

チェックポイント:

- `useState(初期値)` は「その値を React に覚えてもらう」書き方
- `value` は今の値
- `onChange` は入力が変わったときの処理
- `setSearchTerm` を呼ぶと画面が再表示される
- `selectedCategory` も同じ考え方で管理している

## Phase 5: `useEffect` で絞り込みを動かす

見るファイル:

```text
src/utils/productFilters.ts
src/app/page.tsx
```

`productFilters.ts` と `page.tsx` の両方に `TODO(Phase 5)` があります。

埋める内容:

- `includes("")` の空文字を `normalizedSearchTerm` に変える
- `name`, `description`, `category` のどこかに検索語が含まれていれば `true`
- `normalizedSearchTerm === ""` のときは全部表示のままでよい
- `page.tsx` では `useEffect` を使って `filteredProducts` を更新する

ここでは次の形を目標にします。

```tsx
useEffect(() => {
  setFilteredProducts(
    filterProducts(products, searchTerm, selectedCategory),
  );
}, [searchTerm, selectedCategory]);
```

チェックポイント:

- `filter` は条件に合う要素だけを残す
- `trim()` で前後の空白を消している
- `toLowerCase()` で大文字小文字の差を吸収している
- `useEffect` は「state が変わったあとに追加処理をする場所」
- 依存配列 `[searchTerm, selectedCategory]` に入れた値が変わると effect が再実行される
- 条件が増えたら、1 つずつ変数に分けると読みやすい

## Phase 6: 詳細ページへ移動する

見るファイル:

```text
src/app/products/[id]/page.tsx
src/components/ui/ProductCard.tsx
```

`ProductCard` のリンクを押すと、`app/products/[id]/page.tsx` が表示されます。

`page.tsx` には `TODO(Phase 6)` があります。

埋める内容:

- `products.find((item) => item.id === id)` が何をしているか確認する
- 在庫表示の `0` を `product.stock` に変える
- 評価表示の `0` を `product.rating` に変えて `toFixed(1)` する

チェックポイント:

- ページ移動には `next/link` の `Link` を使う
- `[id]` は URL から変わる部分
- 詳細ページでは `params` から `id` を受け取る

## Bonus: お気に入りとカートを読む

見るファイル:

```text
src/app/page.tsx
src/components/containers/CartSummary.tsx
src/components/containers/FavoriteProducts.tsx
```

時間に余裕があれば、配列 state の更新も見てください。

```tsx
const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
```

追加と削除では、元の配列を直接書き換えず、新しい配列を返します。

```tsx
return hasFavorite
  ? currentFavoriteIds.filter((id) => id !== productId)
  : [...currentFavoriteIds, productId];
```

チェックポイント:

- React の state は直接変更しない
- `filter` は削除にも使える
- `...currentFavoriteIds` は今の配列をコピーする書き方

## よくあるエラー

`npm install` をしていない:

```text
Cannot find module ...
```

`"use client"` がない:

```text
useState や useEffect を使うファイルの先頭に "use client" を書く
```

`class` と書いている:

```tsx
<div className="card">...</div>
```

`map` の `key` がない:

```tsx
<ProductCard key={product.id} product={product} />
```

`filter` を書き換えても検索が変わらない:

```text
保存したあと、ブラウザで入力をやり直して確認する
```

`localStorage` を Server Component で使っている:

```text
localStorage は "use client" のあるファイルで、useEffect の中から使う
```

## 困ったときの確認順

検索が動かない:

1. `src/utils/productFilters.ts` の `includes("")` が `includes(normalizedSearchTerm)` になっているか確認する
2. `src/app/page.tsx` の `filterProducts(products, searchTerm, selectedCategory)` を確認する
3. 保存してからブラウザの入力をやり直す

詳細ページが表示されない:

1. 商品カードのリンクが `/products/${product.id}` になっているか確認する
2. `products.ts` の `id` が重複していないか確認する
3. `src/app/products/[id]/page.tsx` の `products.find(...)` が `item.id === id` を見ているか確認する

TypeScript エラーが出た:

1. エラーに出ているファイル名と行番号を見る
2. `string` と `number` を取り違えていないか確認する
3. props の名前が親と子で一致しているか確認する

## 完成確認

最低限ここまで動けば OK です。

- 商品一覧が表示される
- `ProductCard` に説明、価格、在庫、評価が表示される
- `useState` で検索欄とカテゴリ選択を管理できる
- `useEffect` で検索結果が更新される
- 商品カードから詳細ページへ移動できる
- 詳細ページに在庫と評価が表示される

余裕がある人は `02-challenges.md` に進んでください。メンター側には別で `03-challenge-answers.md` が用意されています。

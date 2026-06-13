// Phase 1:
// まずは「商品 1 件がどんな形をしているか」を TypeScript で決めます。
export type ProductCategory = "ガジェット" | "ファッション" | "本" | "食品";

export type Product = {
  id: string; // URL にも使う、一意な ID
  name: string; // 画面に表示する商品名
  description: string; // 商品の紹介文
  price: number; // 価格
  category: ProductCategory;
  imageUrl: string; // 画像 URL
  stock: number; // 在庫数
  rating: number; // 5 点満点の評価
};

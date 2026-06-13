import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "gadget-speaker",
    name: "ポケットスピーカー",
    description:
      "小さめのバッグにも入る、持ち運びしやすい Bluetooth スピーカーです。",
    price: 6800,
    category: "ガジェット",
    imageUrl:
      "https://picsum.photos/id/10/300/200",
    stock: 8,
    rating: 4.4,
  },
  {
    id: "fashion-tote",
    name: "キャンバストート",
    description:
      "A4 ノートやノート PC を入れやすい、毎日使いやすいトートバッグです。",
    price: 3200,
    category: "ファッション",
    imageUrl:
      "https://sc3.locondo.jp/contents/commodity_image/BA/BA4706AW02716_1_l.jpg",
    stock: 14,
    rating: 4.1,
  },
  {
    id: "book-nextjs",
    name: "はじめての Next.js ノート",
    description:
      "App Router と React Hooks をゆっくり学べる、入門者向けの解説本です。",
    price: 2600,
    category: "本",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    stock: 20,
    rating: 4.8,
  },
  {
    id: "food-coffee",
    name: "ドリップコーヒーセット",
    description:
      "作業の合間に飲みやすい、香りのよいドリップバッグの詰め合わせです。",
    price: 1800,
    category: "食品",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    stock: 18,
    rating: 4.3,
  },
  // TODO(Phase 1):
  // 5 件目以降の商品を 1 件ずつ追加してみましょう。
  // まずは下のテンプレートをコピーして、id / name / description などを埋めます。
  // {
  //   id: "gadget-keyboard",
  //   name: "ワイヤレスキーボード",
  //   description: "ここに商品の説明を書く",
  //   price: 9200,
  //   category: "ガジェット",
  //   imageUrl: "https://example.com/image.jpg",
  //   stock: 5,
  //   rating: 4.7,
  // },
];

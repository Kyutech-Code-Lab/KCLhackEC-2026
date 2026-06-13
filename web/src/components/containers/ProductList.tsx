import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";

type ProductListProps = {
  products: Product[];
  cartItems: CartItem[];
  favoriteIds: string[];
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
};

export function ProductList({
  products,
  cartItems,
  favoriteIds,
  onAddToCart,
  onToggleFavorite,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <section className="panel">
        <div className="section-header">
          <h2 className="section-title">商品一覧</h2>
        </div>
        <p className="empty-state">
          条件に合う商品がありません。検索キーワードやカテゴリを変えてみてください。
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="section-header">
        <h2 className="section-title">商品一覧</h2>
        <p className="section-caption">{products.length} 件を表示中</p>
      </div>

      <div className="products-grid">
        {/* TODO(Phase 3-1):
            products.map((product) => { ... }) を書いて、
            配列の中の商品を 1 件ずつ ProductCard に変換します。 */}
        {products.map((_, index) => {
          // TODO(Phase 3-2): 引数の product を使って、同じ商品をカートから探します。
          const cartItem = cartItems.find((item) => item.productId === "");
          // TODO(Phase 3-3): 引数の product を使って、お気に入り状態を反映します。
          const isFavorite = favoriteIds.includes("");

          return (
            <ProductCard
              cartQuantity={cartItem?.quantity ?? 0}
              isFavorite={isFavorite}
              key={`starter-${index}`}
              product={products[index]!}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
            />
          );
        })}
      </div>
    </section>
  );
}

import type { Product } from "@/types/product";

export function getProductCategories(products: Product[]): string[] {
  return ["すべて", ...new Set(products.map((product) => product.category))];
}

export function filterProducts(
  products: Product[],
  searchTerm: string,
  selectedCategory: string,
): Product[] {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return products.filter((product) => {
    // TODO(Phase 5): 空文字を normalizedSearchTerm に書き換えて、
    // name / description / category に検索語が含まれるかを確認します。
    const matchesSearch =
      normalizedSearchTerm === "" ||
      product.name.toLowerCase().includes("") ||
      product.description.toLowerCase().includes("") ||
      product.category.toLowerCase().includes("");

    const matchesCategory =
      selectedCategory === "すべて" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

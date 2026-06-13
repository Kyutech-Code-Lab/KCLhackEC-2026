import assert from "node:assert/strict";

const { products } = await import("../src/data/products.ts");
const { filterProducts, getProductCategories } = await import(
  "../src/utils/productFilters.ts"
);
const { formatPrice } = await import("../src/utils/formatPrice.ts");

assert.ok(products.length >= 4, "Expected at least 4 sample products");
assert.ok(
  products.every(
    (product) =>
      typeof product.id === "string" &&
      typeof product.name === "string" &&
      typeof product.description === "string" &&
      typeof product.price === "number",
  ),
  "Expected every product to follow the Product shape",
);

const categories = getProductCategories(products);
assert.equal(categories[0], "すべて");
for (const category of ["ガジェット", "ファッション", "本", "食品"]) {
  assert.ok(categories.includes(category), `Missing category: ${category}`);
}

const nextProducts = filterProducts(products, "next", "すべて");
assert.ok(Array.isArray(nextProducts), "filterProducts should return an array");
assert.ok(
  nextProducts.every((product) => products.some((item) => item.id === product.id)),
  "filterProducts should only return products from the source list",
);

const foodProducts = filterProducts(products, "", "食品");
assert.ok(foodProducts.length >= 1, "Expected at least one food product");
assert.ok(
  foodProducts.every((product) => product.category === "食品"),
  "Category filtering should keep only matching products",
);

assert.equal(formatPrice(6800), "￥6,800");

console.log("App logic verification passed.");

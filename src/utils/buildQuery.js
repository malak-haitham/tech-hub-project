export function buildProductsQuery(filters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q.trim());
  if (filters.category) params.set("categoryId", filters.category);
  if (filters.province) params.set("provinceId", filters.province);

  // الحالة من الواجهة بالعربي؛ نحولها لقيم API إن لزم
  const map = {
    "جديد": "new",
    "مستعمل كالجديد": "like_new",
    "مستعمل جيد": "good",
    "مستعمل مقبول": "acceptable",
  };
  if (filters.condition && map[filters.condition]) {
    params.set("condition", map[filters.condition]);
  }

  if (Array.isArray(filters.priceRange)) {
    const [minPrice, maxPrice] = filters.priceRange;
    params.set("minPrice", String(minPrice ?? 0));
    params.set("maxPrice", String(maxPrice ?? 1000000));
  }

  // ترقيم الصفحات لاحقًا
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  return params.toString(); // "categoryId=1&provinceId=2&minPrice=0&maxPrice=100000"
}

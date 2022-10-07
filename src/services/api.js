export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function getProductById(PRODUCT_ID) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${PRODUCT_ID}`;
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

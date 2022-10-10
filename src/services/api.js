export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`;
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

export async function getProductById(id) {
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const request = await fetch(endpoint);
  const response = await request.json();

  return response;
}

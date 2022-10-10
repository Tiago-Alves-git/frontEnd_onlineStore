const salvarCarrinhoNoLocalStorage = (produtos) => {
  localStorage.setItem('carrinhoDeCompras', JSON.stringify(produtos));
};

const recuperarCarrinhoDoLocalStorage = () => {
  const listaDeProdutos = JSON.parse(localStorage.getItem('carrinhoDeCompras'));
  return listaDeProdutos;
};

const limparCarrinhoDoLocalStorage = () => {
  localStorage.removeItem('carrinhoDeCompras');
};

export { salvarCarrinhoNoLocalStorage,
  recuperarCarrinhoDoLocalStorage,
  limparCarrinhoDoLocalStorage };

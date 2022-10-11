if (!JSON.parse(localStorage.getItem('carrinhoDeCompras'))) {
  localStorage.setItem('carrinhoDeCompras', JSON.stringify([]));
}

const recuperarCarrinhoDoLocalStorage = () => {
  const listaDeProdutos = JSON.parse(localStorage.getItem('carrinhoDeCompras'));
  return listaDeProdutos;
};

const salvarCarrinhoNoLocalStorage = (listaDeProdutos) => localStorage
  .setItem('carrinhoDeCompras', JSON.stringify(listaDeProdutos));

const adicionaNovoProduto = (produto) => {
  if (produto) {
    const carrinhoAnterior = recuperarCarrinhoDoLocalStorage();
    salvarCarrinhoNoLocalStorage([...carrinhoAnterior, produto]);
  }
};

const limparCarrinhoDoLocalStorage = () => localStorage
  .removeItem('carrinhoDeCompras');

export {
  recuperarCarrinhoDoLocalStorage,
  salvarCarrinhoNoLocalStorage,
  adicionaNovoProduto,
  limparCarrinhoDoLocalStorage,
};

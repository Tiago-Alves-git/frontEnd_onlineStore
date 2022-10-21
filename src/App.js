import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import { adicionaNovoProduto,
  salvarCarrinhoNoLocalStorage,
  recuperarCarrinhoDoLocalStorage } from './services/locaStorage';

class App extends React.Component {
  state = {
    addToCart: [],
  };

  getCart = () => {
    const cartLocalStorage = recuperarCarrinhoDoLocalStorage();
    this.setState({ addToCart: cartLocalStorage });
  };

  handleButton = (param) => {
    param.quantidade = 1;
    this.setState((prevState) => ({
      addToCart: [...prevState.addToCart, param],
    }), () => adicionaNovoProduto(param));
  };

  // * verificar setState() jeito 1
  addQuantidade = (produto) => {
    const { addToCart } = this.state;
    produto.quantidade += 1;
    this.setState(() => ({
      addToCart,
    }), salvarCarrinhoNoLocalStorage(addToCart));
  };

  // * verificar setState() jeito 2
  removeQuantidade = (produto) => {
    const { addToCart } = this.state;
    produto.quantidade -= 1;
    const novoaddToCart = [...addToCart];
    this.setState(() => ({
      addToCart: novoaddToCart,
    }), salvarCarrinhoNoLocalStorage(addToCart));
  };

  removeAllItemCart = ({ target }) => {
    const { name } = target;
    const { addToCart } = this.state;
    const newListAddToCart = addToCart.filter((product) => (name !== product.id));
    this.setState({ addToCart: newListAddToCart });
    salvarCarrinhoNoLocalStorage(newListAddToCart);
  };

  // addQuantidade = (produto) => {
  //   const num = -1;
  //   const getLocalStorage = recuperarCarrinhoDoLocalStorage();
  //   const prodSalvos = getLocalStorage.filter((p) => p.id !== produto.id);
  //   const prod = getLocalStorage.find((p) => p.id === produto.id);
  //   prod.quantidade += 1;
  //   const newAddToCart = [prod, ...prodSalvos];
  //   newAddToCart.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase()
  //     ? 1
  //     : num));
  //   console.log(newAddToCart);
  //   this.setState({ addToCart: newAddToCart });
  //   salvarCarrinhoNoLocalStorage(newAddToCart);
  // };

  render() {
    const { addToCart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              handleButton={ this.handleButton }
              addToCart={ addToCart }
              getCart={ this.getCart }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              addToCart={ addToCart }
              handleButton={ this.handleButton }
              removeAllItemCart={ this.removeAllItemCart }
              getCart={ this.getCart }
              validateItemsCart={ this.validateItemsCart }
              addQuantidade={ this.addQuantidade }
              removeQuantidade={ this.removeQuantidade }
            />) }
          />
          <Route
            exact
            path="/produto/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              getCart={ this.getCart }
              addToCart={ addToCart }
              handleButton={ this.handleButton }
            />) }
          />
          <Route
            path="/checkout"
            render={ (props) => (
              <Checkout { ...props } addToCart={ addToCart } getCart={ this.getCart } />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

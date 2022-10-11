import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { adicionaNovoProduto,
  salvarCarrinhoNoLocalStorage,
  recuperarCarrinhoDoLocalStorage } from './services/locaStorage';

class App extends React.Component {
  state = {
    addToCart: [],
    countItem: 1,
  };

  getCart = () => {
    const cartLocalStorage = recuperarCarrinhoDoLocalStorage();
    this.setState({ addToCart: cartLocalStorage });
  };

  handleButton = (param) => {
    this.setState((prevState) => ({
      addToCart: [...prevState.addToCart, param],
    }), () => adicionaNovoProduto(param));
  };

  removeAllItemCart = ({ target }) => {
    const { name } = target;
    const { addToCart } = this.state;
    const newListAddToCart = addToCart.filter((product) => (name !== product.id));
    salvarCarrinhoNoLocalStorage(newListAddToCart);
    this.setState({ addToCart: newListAddToCart });
  };

  removeItemCart = ({ target }) => {
    const { name } = target;
    const { addToCart } = this.state;
    const productRemoved = addToCart.find((product) => (name === product.id));
    const indexRemoved = addToCart.indexOf(productRemoved);
    const newListAddToCart = addToCart
      .filter((_product, index) => (index !== indexRemoved));
    salvarCarrinhoNoLocalStorage(newListAddToCart);
    this.setState({ addToCart: newListAddToCart });
  };

  render() {
    const { addToCart, countItem } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Home
              { ...props }
              handleButton={ this.handleButton }
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              addToCart={ addToCart }
              handleButton={ this.handleButton }
              removeAllItemCart={ this.removeAllItemCart }
              removeItemCart={ this.removeItemCart }
              addItemCart={ this.addItemCart }
              getCart={ this.getCart }
              countItem={ countItem }
            />) }
          />
          <Route
            exact
            path="/produto/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              addToCart={ addToCart }
              handleButton={ this.handleButton }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

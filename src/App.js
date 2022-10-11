import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { adicionaNovoProduto,
  salvarCarrinhoNoLocalStorage } from './services/locaStorage';

class App extends React.Component {
  state = {
    addToCart: [],
    countItem: 1,
  };

  handleButton = (param) => {
    // const { addToCart } = this.state;
    this.setState((prevState) => ({
      addToCart: [...prevState.addToCart, param],
    }), () => adicionaNovoProduto(param));
  };

  removeItemCart = ({ target }) => {
    const { name } = target;
    const { addToCart } = this.state;
    const newListAddToCart = addToCart.filter((product) => (name !== product.id));
    salvarCarrinhoNoLocalStorage(newListAddToCart);
    this.setState({ addToCart: newListAddToCart });
  };

  addItemCart = ({ target }) => {
    const { name } = target;
    // console.log('Name(ID): ', name);
    const { addToCart, countItem } = this.state;
    // console.log(addToCart);

    let count = countItem;
    // console.log('Inicial: ', count);
    const productInCart = addToCart.some(({ id }) => (name === id));
    // console.log('Produto repetido? ', productInCart);

    if (productInCart) {
      count += 1;
      this.setState({ countItem: count });
    }
    // console.log('Incrementando: ', count);
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
              removeItemCart={ this.removeItemCart }
              addItemCart={ this.addItemCart }
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

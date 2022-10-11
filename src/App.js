import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { adicionaNovoProduto } from './services/locaStorage';

class App extends React.Component {
  state = {
    addToCart: [],
  };

  handleButton = (param) => {
    // const { addToCart } = this.state;
    this.setState((prevState) => ({
      addToCart: [...prevState.addToCart, param],
    }), () => adicionaNovoProduto(param));
  };

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
            />) }
          />
          <Route
            path="/cart"
            render={ (props) => (<Cart
              { ...props }
              addToCart={ addToCart }
              handleButton={ this.handleButton }
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

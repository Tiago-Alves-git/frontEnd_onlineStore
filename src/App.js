import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  state = {
    addToCart: [],
  };

  handleButton = (param) => {
    console.log(param);
    this.setState((prevState) => ({
      addToCart: [...prevState.addToCart, param],
    }));
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
            />) }
          <Route
            exact
            path="/produto/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

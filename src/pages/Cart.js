import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiUndo } from 'react-icons/bi';
// import { recuperarCarrinhoDoLocalStorage } from '../services/locaStorage';

class Cart extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { newAddToCart: [] };
  // }

  componentDidMount() {
    const { getCart } = this.props;
    getCart();
  }

  // componentDidMount() {
  //   const cartLocalStorage = recuperarCarrinhoDoLocalStorage();
  //   this.setState({ newAddToCart: cartLocalStorage });
  // }

  render() {
    // const { newAddToCart } = this.state;
    const {
      addToCart,
      removeAllItemCart,
      removeItemCart,
      handleButton,
    } = this.props;

    // const test = [...new Set(addToCart)];
    // console.log(test);

    return (
      <div>
        <div>
          <Link to="/"><BiUndo /></Link>
          <h2>Carrinho de compras</h2>
        </div>
        { addToCart.length < 1 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : ([...new Set(addToCart)].map((items, index) => (
          <div key={ index }>
            <button
              data-testid="remove-product"
              type="button"
              name={ items.id }
              onClick={ removeAllItemCart }
            >
              X
            </button>
            <p data-testid="shopping-cart-product-name">
              {items.title}
            </p>
            <img src={ items.thumbnail } alt={ items.title } />
            <p>
              {items.price}
            </p>
            <button
              data-testid="product-decrease-quantity"
              type="button"
              name={ items.id }
              onClick={ removeItemCart }
            >
              -
            </button>
            <p>{ addToCart.filter((prod) => (prod === items)).length }</p>
            <button
              data-testid="product-increase-quantity"
              type="button"
              name={ items.id }
              onClick={ () => handleButton(items) }
            >
              +
            </button>
          </div>))
        )}
        <p data-testid="shopping-cart-product-quantity">
          Quantidade de items em seu carrinho :
          {' '}
          {addToCart.length}
        </p>
      </div>
    );
  }
}

Cart.propTypes = {
  addToCart: PropTypes.shape({
    title: PropTypes.string,
  }),
}.isRequired;
export default Cart;

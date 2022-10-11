import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiUndo } from 'react-icons/bi';

class Cart extends React.Component {
  render() {
    const { addToCart, removeItemCart, addItemCart, countItem } = this.props;
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
        ) : (addToCart.map((items) => (
          <div key={ items.id }>
            <button
              data-testid="remove-product"
              type="button"
              name={ items.id }
              onClick={ removeItemCart }
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
            >
              -
            </button>
            <p>{ countItem }</p>
            <button
              data-testid="product-increase-quantity"
              type="button"
              name={ items.id }
              onClick={ addItemCart }
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

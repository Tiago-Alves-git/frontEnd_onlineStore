import PropTypes from 'prop-types';
import React from 'react';

class Cart extends React.Component {
  render() {
    const { addToCart } = this.props;
    console.log(addToCart);
    return (
      <div>
        { addToCart.length < 1 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (addToCart.map((items) => (
          <div key={ items.id }>
            <p data-testid="shopping-cart-product-name">
              {items.title}
            </p>
            <img src={ items.thumbnail } alt={ items.title } />
            <p>
              {items.price}
            </p>
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

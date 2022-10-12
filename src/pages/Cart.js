import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiUndo } from 'react-icons/bi';
// import { recuperarCarrinhoDoLocalStorage } from '../services/locaStorage';

class Cart extends React.Component {
  componentDidMount() {
    const { getCart } = this.props;
    getCart();
  }

  render() {
    const {
      addToCart,
      removeAllItemCart,
      removeQuantidade,
      addQuantidade,
    } = this.props;

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
        ) : ((addToCart).map((items, index) => (
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
              onClick={ () => removeQuantidade(items) }
              disabled={ items.quantidade === 1 }
            >
              -
            </button>
            <p data-testid="shopping-cart-product-quantity">{ items.quantidade }</p>
            <button
              data-testid="product-increase-quantity"
              type="button"
              name={ items.id }
              onClick={ () => addQuantidade(items) }
            >
              +
            </button>
          </div>))
        )}
        <p>
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

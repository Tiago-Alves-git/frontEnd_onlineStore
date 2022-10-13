import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiUndo } from 'react-icons/bi';
import { BsFillCartXFill, BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import '../style/Cart.css';

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
      <div className="container-cart">
        <div className="header-cart">
          <Link to="/"><BiUndo className="back-to-home" /></Link>
          <h2 className="cart-title">Carrinho de compras</h2>
        </div>
        <div className="container-items-cart">
          { addToCart.length < 1 ? (
            <p data-testid="shopping-cart-empty-message" className="message-cart-empty">
              Seu carrinho está vazio
            </p>
          ) : ((addToCart).map((items, index) => (
            <div key={ index } className="container-item">
              <button
                data-testid="remove-product"
                type="button"
                name={ items.id }
                onClick={ removeAllItemCart }
                className="btn-remove-item"
              >
                <BsFillCartXFill className="icon-remove" />
              </button>
              <img src={ items.thumbnail } alt={ items.title } />
              <p data-testid="shopping-cart-product-name">
                {items.title}
              </p>
              <p>
                {items.price}
              </p>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                name={ items.id }
                onClick={ () => removeQuantidade(items) }
                disabled={ items.quantidade === 1 }
                className="btn-decrease"
              >
                <BsFillCartDashFill className="icon-decrease" />
              </button>
              <p data-testid="shopping-cart-product-quantity">{ items.quantidade }</p>
              <button
                data-testid="product-increase-quantity"
                type="button"
                name={ items.id }
                onClick={ () => addQuantidade(items) }
                className="btn-increase"
              >
                <BsFillCartPlusFill className="icon-increase" />
              </button>
            </div>))
          )}
        </div>
        <fieldset>
          <p>
            Quantidade de items em seu carrinho :
            {' '}
            {addToCart.length}
          </p>
        </fieldset>
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

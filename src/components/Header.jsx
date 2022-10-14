import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import '../style/Header.css';

class Header extends React.Component {
  componentDidMount() {
    const { getCart } = this.props;
    getCart();
  }

  countItemsCart = () => {
    const { addToCart } = this.props;
    const totalProd = addToCart?.reduce((count, prod) => {
      count += prod.quantidade;
      return count;
    }, 0);
    return totalProd;
  };

  render() {
    const { handleSearch, handleSearchSubmit, pesquisa } = this.props;

    return (
      <div className="container-header">
        <p>Header</p>
        <div className="container-search">
          <input
            data-testid="query-input"
            className="input-search"
            type="text"
            value={ pesquisa }
            onChange={ handleSearch }
          />
          <button
            data-testid="query-button"
            className="button-search"
            type="button"
            onClick={ handleSearchSubmit }
          >
            Buscar produto
          </button>

          <Link
            data-testid="shopping-cart-button"
            to="/cart"
          >
            <BiCart className="icon-cart" />
          </Link>
          <p data-testid="shopping-cart-size">
            { this.countItemsCart() }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  handleSearch: PropTypes.func,
  pesquisa: PropTypes.string,
}.isRequired;

export default Header;

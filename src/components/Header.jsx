import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import '../style/Header.css';

class Header extends React.Component {
  state = { loading: false };

  componentDidMount() {
    const { getCart } = this.props;
    this.setState({ loading: true });
    console.log('Executando did');
    getCart();
  }

  countItemsCart = () => {
    const { loading } = this.state;
    const { addToCart } = this.props;
    console.log('primeiro render', loading);
    if (loading) {
      // console.log(addToCart);
      // console.log('ok', addToCart[0].quantidade);
      const totalProd = addToCart.reduce((count, prod) => {
        count += prod.quantidade;
        return count;
      }, 0);
      console.log('pos if', totalProd);
      return totalProd;
    }
  };

  render() {
    console.log('Executando render');
    const { handleSearch, handleSearchSubmit, pesquisa } = this.props;
    const { loading } = this.state;

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
            { loading && this.countItemsCart() }
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

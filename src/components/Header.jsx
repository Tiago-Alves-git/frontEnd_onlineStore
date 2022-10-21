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
    return (
      <div>
        <div className="Header">
          <div>
            <Link to="/" className="linkHome"> Home </Link>
          </div>
          <div>
            <h1 className="titleHeader"> Online Store </h1>
          </div>
          <div className="IconCart">
            <Link
              data-testid="shopping-cart-button"
              to="/cart"
            >
              <BiCart className="icon-cart" color="white" />
            </Link>
            <p data-testid="shopping-cart-size">
              { this.countItemsCart() }
            </p>
          </div>
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

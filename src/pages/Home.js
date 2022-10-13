import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import Produtos from '../components/Produtos';
import Categorias from '../components/Categorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import '../style/Home.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      categoria: null,
      listaDeProdutos: null,
    };
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ pesquisa: value });
  };

  handleSearchSubmit = async () => {
    const { pesquisa, categoria } = this.state;
    const result = await getProductsFromCategoryAndQuery(categoria, pesquisa);

    this.setState({ listaDeProdutos: result.results });
  };

  handleSearchCategory = async (idCategory) => {
    this.setState({ categoria: idCategory }, this.handleSearchSubmit);
  };

  render() {
    const { pesquisa, listaDeProdutos } = this.state;
    const { handleButton, addToCart } = this.props;

    const totalProd = addToCart.reduce((count, prod) => {
      count += prod.quantidade;
      return count;
    }, 0);

    return (
      <div className="container-home">
        <Categorias
          handleSearchCategory={ this.handleSearchCategory }
        />

        <div className="container-products">
          <div className="container-search">
            <input
              data-testid="query-input"
              className="input-search"
              type="text"
              value={ pesquisa }
              onChange={ this.handleSearch }
            />
            <button
              data-testid="query-button"
              className="button-search"
              type="button"
              onClick={ this.handleSearchSubmit }
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
              { totalProd }
            </p>
          </div>
          { listaDeProdutos
            ? (
              <Produtos
                listaDeProdutos={ listaDeProdutos }
                handleButton={ handleButton }
              />
            )
            : (
              <h2
                data-testid="home-initial-message"
                className="text-default"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h2>
            )}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  handleButton: PropTypes.any,
}.isRequired;

export default Home;

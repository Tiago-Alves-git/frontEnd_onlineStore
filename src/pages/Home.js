import PropTypes from 'prop-types';
import React from 'react';
import Produtos from '../components/Produtos';
import Categorias from '../components/Categorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Header from '../components/Header';
import '../style/Home.css';
import SearchBar from '../components/SearchBar';

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
    const { listaDeProdutos, pesquisa } = this.state;
    const { handleButton, addToCart, getCart } = this.props;
    // console.log(addToCart);
    return (
      <div className="container-home">
        <Header
          addToCart={ addToCart }
          getCart={ getCart }
        />
        <SearchBar
          handleSearch={ this.handleSearch }
          handleSearchSubmit={ this.handleSearchSubmit }
          pesquisa={ pesquisa }
        />
        <div className="container-content">
          <Categorias
            handleSearchCategory={ this.handleSearchCategory }
          />
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

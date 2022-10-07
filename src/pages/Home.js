import React from 'react';
import Produtos from '../components/Produtos';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categorias from '../componente/Categorias';
import { Link } from 'react-router-dom';

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

  render() {
    const { pesquisa, listaDeProdutos } = this.state;
    return (
      <div>
        <Categorias />
        <input
          data-testid="query-input"
          type="text"
          value={ pesquisa }
          onChange={ this.handleSearch }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleSearchSubmit }
        >
          Buscar produto
        </button>
        
        <Link data-testid="shopping-cart-button" to="/cart"> Carrinho de Compras </Link>
        
        {listaDeProdutos
          ? (
            <Produtos listaDeProdutos={ listaDeProdutos } />
          )
          : (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
      </div>
    );
  }
}

export default Home;

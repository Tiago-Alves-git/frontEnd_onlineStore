import React from 'react';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import Produtos from '../components/Produtos';
import Categorias from '../components/Categorias';
import { getProductsFromCategoryAndQuery, getProductById } from '../services/api';
import SearchCategory from '../components/SearchCategory';
import '../style/Home.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      categoria: null,
      listaDeProdutos: null,
      productByCategory: [],
      isFiltred: false,
    };
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ pesquisa: value, isFiltred: false });
  };

  handleSearchSubmit = async () => {
    const { pesquisa, categoria } = this.state;
    const result = await getProductsFromCategoryAndQuery(categoria, pesquisa);

    this.setState({ listaDeProdutos: result.results });
  };

  handleSearchCategory = async ({ target }) => {
    const { name } = target;
    console.log('Função executada');
    const request = await getProductById(name);
    const resultSearch = request.results;
    this.setState({ productByCategory: resultSearch, isFiltred: true });
  };

  render() {
    const { pesquisa, listaDeProdutos, productByCategory, isFiltred } = this.state;
    return (
      <div className="container-home">
        {/* Props para ser preenchida no componente categorias. Elevando state */}
        <Categorias
          productByCategory={ productByCategory }
          handleSearchCategory={ this.handleSearchCategory }
          isFiltred={ isFiltred }
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
          </div>
          { isFiltred && (<SearchCategory productByCategory={ productByCategory } />) }
          { listaDeProdutos && (<Produtos listaDeProdutos={ listaDeProdutos } />) }
          <h2
            data-testid="home-initial-message"
            className="text-default"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        </div>
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { getCategories, getProductById } from '../services/api';
import '../style/Categorias.css';
import SearchCategory from './SearchCategory';

class Categorias extends React.Component {
  constructor() {
    super();

    this.state = {
      listaCategorias: [],
      productByCategory: [],
      isFiltred: false,
    };
  }

  async componentDidMount() {
    const resposta = await getCategories();
    this.setState({
      listaCategorias: resposta,
      isFiltred: false,
    });
  }

  handleSearchCategory = async ({ target }) => {
    const { name } = target;
    const request = await getProductById(name);
    const resultSearch = request.results;
    this.setState({ productByCategory: resultSearch, isFiltred: true });
  };

  render() {
    const { listaCategorias, productByCategory, isFiltred } = this.state;
    return (
      <div className="container-category">
        <ul>
          {listaCategorias.map((e, i) => (
            <button
              data-testid="category"
              className="button-category"
              type="button"
              key={ i }
              name={ e.name }
              onClick={ this.handleSearchCategory }
            >
              {e.name}
            </button>))}
        </ul>
        {/* --------> Verificar a props <-------- */}
        <SearchCategory
          productByCategory={ productByCategory }
          isFiltred={ isFiltred }
        />
      </div>
    );
  }
}

export default Categorias;

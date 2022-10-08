import React from 'react';
import { getCategories, getProductById } from '../services/api';
import Home from './SearchCategory';

class Categorias extends React.Component {
  constructor() {
    super();

    this.state = {
      listaCategorias: [],
      productByCategory: [],
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
      <div>
        <ul>
          {listaCategorias.map((e, i) => (
            <button
              type="button"
              key={ i }
              name={ e.name }
              data-testid="category"
              onClick={ this.handleSearchCategory }
            >
              {e.name}
            </button>))}
        </ul>
        <Home
          productByCategory={ productByCategory }
          isFiltred={ isFiltred }
        />
      </div>
    );
  }
}

export default Categorias;

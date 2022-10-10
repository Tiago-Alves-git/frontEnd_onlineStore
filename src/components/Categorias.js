import React from 'react';
import { func } from 'prop-types';
import { getCategories } from '../services/api';
import '../style/Categorias.css';
// import SearchCategory from './SearchCategory';

class Categorias extends React.Component {
  constructor() {
    super();

    this.state = {
      listaCategorias: [],
      // productByCategory: [],
    };
  }

  async componentDidMount() {
    const resposta = await getCategories();
    this.setState({
      listaCategorias: resposta,
    });
  }

  // handleSearchCategory = async ({ target }) => {
  //   const { name } = target;
  //   const request = await getProductById(name);
  //   const resultSearch = request.results;
  //   this.setState({ productByCategory: resultSearch });
  // };

  render() {
    const { listaCategorias } = this.state;
    const { handleSearchCategory } = this.props;
    return (
      <div className="container-category">
        <ul>
          {listaCategorias.map((e, i) => (
            <button
              data-testid="category"
              type="button"
              className="button-category"
              key={ i }
              name={ e.name }
              onClick={ handleSearchCategory }
            >
              {e.name}
            </button>))}
        </ul>
      </div>
    );
  }
}

Categorias.propTypes = {
  handleSearchCategory: func.isRequired,
};

export default Categorias;

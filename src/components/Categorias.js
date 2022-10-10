import React from 'react';
import { func } from 'prop-types';
import { getCategories } from '../services/api';
import '../style/Categorias.css';

class Categorias extends React.Component {
  constructor() {
    super();

    this.state = {
      listaCategorias: [],
    };
  }

  async componentDidMount() {
    const resposta = await getCategories();
    this.setState({
      listaCategorias: resposta,
    });
  }

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
              onClick={ () => handleSearchCategory(e.id) }
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

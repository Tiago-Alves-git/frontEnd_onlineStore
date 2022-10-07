import React from 'react';
import { getCategories } from '../services/api';

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
    return (
      <div>
        <ul>
          {listaCategorias.map((e, i) => (
            <button
              type="button"
              key={ i }
              data-testid="category"
            >
              {e.name}
            </button>))}
        </ul>
      </div>
    );
  }
}

export default Categorias;

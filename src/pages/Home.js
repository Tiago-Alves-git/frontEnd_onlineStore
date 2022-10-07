import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
      // items: [],
    };
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ pesquisa: value });
  };

  render() {
    const { pesquisa } = this.state;
    return (
      <>
        <input type="text" value={ pesquisa } onChange={ this.handleSearch } />
        <Link data-testid="shopping-cart-button" to="/cart"> Carrinho de Compras </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default Home;

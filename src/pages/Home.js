import React from 'react';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      pesquisa: '',
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
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default Home;

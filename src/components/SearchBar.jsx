import PropTypes from 'prop-types';
import React from 'react';

class SearchBar extends React.Component {
  render() {
    const { handleSearch, handleSearchSubmit, pesquisa } = this.props;
    return (
      <div>
        <div className="container-search">
          <input
            data-testid="query-input"
            className="input-search"
            type="text"
            value={ pesquisa }
            onChange={ handleSearch }
          />
          <button
            data-testid="query-button"
            className="button-search"
            type="button"
            onClick={ handleSearchSubmit }
          >
            Buscar produto
          </button>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  pesquisa: PropTypes.string,
}.isRequired;

export default SearchBar;

import PropTypes from 'prop-types';
import React from 'react';

class Produtos extends React.Component {
  render() {
    const { listaDeProdutos } = this.props;
    console.log(listaDeProdutos);
    return (
      <div>
        {listaDeProdutos.length > 1
          ? listaDeProdutos.map((produto, index) => (
            <div
              data-testid="product"
              key={ index }
            >
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{produto.title}</p>
              <p>{`R$ ${produto.price}`}</p>
            </div>
          ))
          : <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}

Produtos.propTypes = {
  listaDeProdutos: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;

export default Produtos;

import PropTypes from 'prop-types';
import React from 'react';
import '../style/Produtos.css';

class Produtos extends React.Component {
  render() {
    const { listaDeProdutos } = this.props;
    return (
      <div className="container-products">
        {listaDeProdutos.length > 1
          ? listaDeProdutos.map((produto, index) => (
            <div
              data-testid="product"
              className="product"
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

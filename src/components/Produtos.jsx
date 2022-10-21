import PropTypes from 'prop-types';
import React from 'react';
import '../style/Produtos.css';
import { Link } from 'react-router-dom';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BsFillCartPlusFill } from 'react-icons/bs';

class Produtos extends React.Component {
  render() {
    const { listaDeProdutos, handleButton } = this.props;
    return (
      <div className="container-products">
        {listaDeProdutos.length > 1
          ? listaDeProdutos.map((produto, index) => (
            <div
              key={ produto.id }
              style={ { color: '#333' } }
              className="product"
            >
              <Link
                style={ { textDecoration: 'none', color: '#333' } }
                to={ `/produto/${produto.id}` }
                data-testid="product-detail-link"
              >
                <div
                  data-testid="product"
                  key={ index }
                  className="teste"
                >
                  <p className="titleProduct">{produto.title}</p>
                  <img
                    src={ produto.thumbnail }
                    alt={ produto.title }
                    className="imagemProdutos"
                  />
                  <p>{`R$ ${Number(produto.price).toFixed(2)}`}</p>
                  { produto.shipping.free_shipping
                  && (
                    <p data-testid="free-shipping">
                      <MdOutlineLocalShipping />
                      {' '}
                      Frete Gratis
                    </p>
                  )}

                </div>
              </Link>

              <button
                type="button"
                onClick={ () => { handleButton(produto); } }
                data-testid="product-add-to-cart"
                className="cssbuttons-io-button"
              >
                Adicione ao carrinho
                <div className="icon">
                  <BsFillCartPlusFill className="icon-add-to-cart" />
                </div>
              </button>
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

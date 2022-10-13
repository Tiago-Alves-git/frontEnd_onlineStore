import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Formulario from '../components/Formulario';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      produtos: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } }, getCart } = this.props;
    getCart();
    const response = await getProductById(id);
    this.setState({ produtos: response, loading: true });
  }

  render() {
    const { produtos, loading } = this.state;
    const { handleButton, addToCart } = this.props;

    const totalProd = addToCart.reduce((count, prod) => {
      count += prod.quantidade;
      return count;
    }, 0);

    return (
      <>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de Compras
          </button>
          <p data-testid="shopping-cart-size">
            { totalProd }
          </p>
        </Link>
        <div key={ produtos.id }>
          <h1 data-testid="product-detail-name">{produtos.title}</h1>
          <img
            src={ produtos.thumbnail }
            alt={ produtos.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{produtos.price}</p>
        </div>

        {loading && <Formulario idProduto={ produtos.id } /> }

        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => handleButton(produtos) }
        >
          Adicionar ao carrinho
        </button>
      </>
    );
  }
}

ProductDetails.propTypes = {
  handleButton: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default ProductDetails;

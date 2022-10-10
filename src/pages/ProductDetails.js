import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      produtos: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ produtos: response });
  }

  render() {
    const { produtos } = this.state;
    return (
      <>
        <div key={ produtos.id }>
          <h1 data-testid="product-detail-name">{produtos.title}</h1>
          <img
            src={ produtos.thumbnail }
            alt={ produtos.title }
            data-testid="product-detail-image"
          />
          <p data-testid="product-detail-price">{produtos.price}</p>
        </div>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de Compras
          </button>
        </Link>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;

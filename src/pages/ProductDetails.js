/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { getProductById } from '../services/api';
import Formulario from '../components/Formulario';
import Header from '../components/Header';
import '../style/ProductDetails.css';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      produtos: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ produtos: response, loading: true });
  }

  // countItemsCart = () => {
  //   const { addToCart } = this.props;
  //   const totalProd = addToCart?.reduce((count, prod) => {
  //     count += prod.quantidade;
  //     return count;
  //   }, 0);
  //   return totalProd;
  // };

  render() {
    const { produtos, loading } = this.state;
    const { handleButton, addToCart, getCart } = this.props;

    return (
      <>
        <Header
          addToCart={ addToCart }
          getCart={ getCart }
        />
        {/* <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho de Compras
          </button>
        </Link> */}
        {/* <p data-testid="shopping-cart-size">
          { this.countItemsCart() }
        </p> */}
        <div key={ produtos.id } className="container-product-detail">
          <div className="product-details">
            <img
              src={ produtos.thumbnail }
              alt={ produtos.title }
              data-testid="product-detail-image"
              className="product-img"
            />
            <div className="container-price">
              <h2 data-testid="product-detail-name">{produtos.title}</h2>
              {/* {console.log(produtos)} */}
              { loading && produtos?.shipping.free_shipping
                    && (
                      <p data-testid="free-shipping">
                        <MdOutlineLocalShipping />
                        {' '}
                        Frete Gratis
                      </p>
                    )}
              <p data-testid="product-detail-price" className="price">
                {`R$${Number(produtos.price).toFixed(2)}`}
              </p>
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ () => handleButton(produtos) }
                className="cssbuttons-io-button"
              >
                Adicionar ao carrinho
                <div className="icon">
                  <BsFillCartPlusFill className="icon-add-to-cart" />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="container-form">
          {loading && <Formulario idProduto={ produtos.id } /> }
        </div>
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

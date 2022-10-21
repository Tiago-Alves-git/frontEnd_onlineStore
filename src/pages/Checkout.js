import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      CPF: '',
      phone: '',
      CEP: '',
      address: '',
      payment: '',
      validateForm: false,
      messageError: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validadeInputs);
  };

  validadeInputs = () => {
    const { name, email, CPF, phone, CEP, address, payment } = this.state;
    const result = name && email && CPF && phone && CEP && address && payment;
    this.setState({ validateForm: !!result });
    // * !! serve para retornar boleano
    return !!result;
  };

  buttonSumit = () => {
    const { history } = this.props;
    const { validateForm } = this.state;
    if (!validateForm) {
      this.setState({ messageError: true });
    } else {
      this.setState({ messageError: false });
      localStorage.setItem('carrinhoDeCompras', JSON.stringify([]));
      history.push('/');
    }
  };

  render() {
    const { addToCart, getCart } = this.props;
    const {
      name,
      email,
      CPF,
      phone,
      CEP,
      address,
      messageError,
    } = this.state;
    return (
      <div>
        <Header
          addToCart={ addToCart }
          getCart={ getCart }
        />
        <h2>Dados para pagamento</h2>
        <div>
          <h3>Resumo Pedido</h3>
          { addToCart.map((product) => (
            <div key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.title }</p>
              <p>{ product.price }</p>
            </div>
          ))}
        </div>
        <div>
          <h3>Informações do comprador</h3>
          <form>
            <input
              data-testid="checkout-fullname"
              type="text"
              name="name"
              value={ name }
              id="input__name"
              placeholder="Nome Completo"
              required
              onChange={ this.onInputChange }
            />
            <input
              data-testid="checkout-email"
              type="text"
              name="email"
              value={ email }
              id="input__email"
              placeholder="Email"
              required
              onChange={ this.onInputChange }
            />
            <input
              data-testid="checkout-cpf"
              type="text"
              name="CPF"
              value={ CPF }
              id="input__cpf"
              placeholder="CPF"
              required
              onChange={ this.onInputChange }
            />
            <input
              data-testid="checkout-phone"
              type="text"
              name="phone"
              value={ phone }
              id="input__phone"
              placeholder="Telefone"
              required
              onChange={ this.onInputChange }
            />
            <input
              data-testid="checkout-cep"
              type="text"
              name="CEP"
              value={ CEP }
              id="input__cep"
              placeholder="CEP"
              required
              onChange={ this.onInputChange }
            />
            <input
              data-testid="checkout-address"
              type="text"
              name="address"
              value={ address }
              id="input__address"
              placeholder="Endereço"
              required
              onChange={ this.onInputChange }
            />
            <label htmlFor="input__payment">
              <input
                data-testid="ticket-payment"
                type="radio"
                name="payment"
                value="boleto"
                onChange={ this.onInputChange }
                id="input__payment"
                // checked
              />
              Boleto
            </label>
            <label htmlFor="input__visa">
              <input
                data-testid="visa-payment"
                type="radio"
                name="payment"
                value="visa"
                onChange={ this.onInputChange }
                id="input__visa"
              />
              Visa
            </label>
            <label htmlFor="input__master">
              <input
                data-testid="master-payment"
                type="radio"
                name="payment"
                value="master"
                onChange={ this.onInputChange }
                id="input__master"
              />
              Master
            </label>
            <label htmlFor="input__elo">
              <input
                data-testid="elo-payment"
                type="radio"
                name="payment"
                value="elo"
                onChange={ this.onInputChange }
                id="input__elo"
              />
              Elo
            </label>
            <button
              data-testid="checkout-btn"
              type="button"
              onClick={ this.buttonSumit }
            >
              Comprar
            </button>
            { messageError && <p data-testid="error-msg">Campos inválidos</p> }
          </form>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  addToCart: PropTypes.shape({
    title: PropTypes.string,
  }),
}.isRequired;

export default Checkout;

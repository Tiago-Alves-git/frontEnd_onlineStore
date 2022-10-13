import React from 'react';
import PropTypes from 'prop-types';
import AvaliacoesList from './AvaliacoesList';

const um = 1;
const dois = 2;
const tres = 3;
const quatro = 4;
const cinco = 5;

class Formulario extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      nota: undefined,
      comentario: '',
      mensagemErro: false,
      localMontado: false,
    };
  }

  componentDidMount() {
    const { idProduto } = this.props;
    if (JSON.parse(localStorage.getItem(idProduto))) {
      this.setState({
        localMontado: true,
      });
    }
  }

  salvarAvaliaco = () => {
    const { idProduto } = this.props;
    const { nota, email, comentario } = this.state;
    const avaliacaoAtual = [{ email, text: comentario, rating: nota }];
    const avaliacaoAnterior = JSON.parse(localStorage.getItem(idProduto));
    const juntarAvaliacao = [...avaliacaoAtual, ...avaliacaoAnterior];
    localStorage.removeItem(idProduto);
    localStorage.setItem(idProduto, JSON.stringify(juntarAvaliacao));
    this.setState({
      mensagemErro: false,
      comentario: '',
      email: '',
      nota: undefined,
    });
  };

  avaliar = () => {
    const { email, nota } = this.state;
    const regex = /\S+@\S+\.\S+/;

    if (regex.test(email) === false || email === '' || typeof nota === 'undefined') {
      this.setState({
        mensagemErro: true,
      });
    } else {
      const { localMontado } = this.state;
      if (localMontado === false) {
        const { idProduto } = this.props;
        const avaliacaoInicial = [];
        localStorage.setItem(idProduto, JSON.stringify(avaliacaoInicial));
        this.setState({
          localMontado: true,
        });
      }

      this.salvarAvaliaco();
    }
  };

  controlaEstado = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, comentario, mensagemErro, localMontado } = this.state;
    const { idProduto } = this.props;
    // console.log(`teste${idProduto}`);

    return (
      <>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={ email }
            onChange={ this.controlaEstado }
            required
            name="email"
            data-testid="product-detail-email"
          />
        </label>
        <br />
        <label htmlFor="nota">
          De uma nota de 1 a 5 para o produto
          <br />
          1
          {' '}
          <input
            id="nota"
            type="radio"
            name="nota"
            value={ 1 }
            onChange={ this.controlaEstado }
            data-testid={ `${um}-rating` }
            required
          />
          2
          {' '}
          <input
            id="nota"
            type="radio"
            name="nota"
            value={ 2 }
            onChange={ this.controlaEstado }
            data-testid={ `${dois}-rating` }
            required
          />
          3
          {' '}
          <input
            id="nota"
            type="radio"
            name="nota"
            value={ 3 }
            onChange={ this.controlaEstado }
            data-testid={ `${tres}-rating` }
            required
          />
          4
          {' '}
          <input
            id="nota"
            type="radio"
            name="nota"
            value={ 4 }
            onChange={ this.controlaEstado }
            data-testid={ `${quatro}-rating` }
            required
          />
          5
          {' '}
          <input
            id="nota"
            type="radio"
            name="nota"
            value={ 5 }
            onChange={ this.controlaEstado }
            data-testid={ `${cinco}-rating` }
            required
          />
        </label>
        <label htmlFor="comentario">
          Escreva um comentario Sobre o produto
          <textarea
            id="comentario"
            name="comentario"
            value={ comentario }
            onChange={ this.controlaEstado }
            data-testid="product-detail-evaluation"
          />
        </label>
        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ this.avaliar }
        >
          Avaliar

        </button>
        {mensagemErro && <p data-testid="error-msg"> Campos inválidos</p> }
        {localMontado && <AvaliacoesList idProduto={ idProduto } />}

      </>
    );
  }
}

Formulario.propTypes = {
  idProduto: PropTypes.string.isRequired,
};

export default Formulario;

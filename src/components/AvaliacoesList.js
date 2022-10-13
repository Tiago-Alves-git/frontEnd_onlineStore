import React from 'react';
import PropTypes from 'prop-types';

class AvaliacoesList extends React.Component {
  render() {
    const { idProduto } = this.props;
    const avaliacoes = JSON.parse(localStorage.getItem(idProduto));
    return (
      <>
        {avaliacoes.map((e, i) => (
          <div key={ i }>
            <p data-testid="review-card-email">{e.email}</p>
            <p data-testid="review-card-rating">{e.rating}</p>
            <p data-testid="review-card-evaluation">{e.text}</p>
          </div>
        ))}
      </>
    );
  }
}

AvaliacoesList.propTypes = {
  idProduto: PropTypes.arrayOf.isRequired,
};
export default AvaliacoesList;

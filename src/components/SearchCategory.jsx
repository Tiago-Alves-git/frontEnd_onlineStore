import React from 'react';
import { shape, number, func } from 'prop-types';

class SearchCategory extends React.Component {
  render() {
    const { productByCategory } = this.props;
    return (
      <div>
        {/* { console.log(productByCategory) } */}
        { productByCategory.map((prod) => (
          <span data-testid="product" key={ prod.id }>
            <img src={ prod.thumbnail } alt={ prod.title } />
            <p>{ prod.title }</p>
            <p>{`R$ ${prod.price}`}</p>
          </span>
        )) }
      </div>
    );
  }
}

SearchCategory.propTypes = {
  productByCategory: shape({
    length: number,
    map: func,
  }),
}.isRequired;

export default SearchCategory;

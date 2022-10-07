import React from "react";

class Cart extends React.Component{
    render() {
        const { items } = this.props
        return(
            <div>
                <p data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
                </p>
            </div>
        )
    }
}
export default Cart;

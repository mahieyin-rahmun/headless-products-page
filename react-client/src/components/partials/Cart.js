import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CartProduct from './CartProduct';
import { removeFromCart } from "../../store/actions/cartActions";

import { clientRoutes } from "../../routes";




class Cart extends Component {
  placeOrder = () => {
    if (this.props.cart.length > 0) {
      this.props.history.push(clientRoutes.ORDER_ROUTE);
    }
  }

  clearCart = () => {
    this.props.cart.forEach(product => {
      this.props.removeFromCart(product.productID);
    });
  }

  render() {
    let grandTotalPrice = 0;

    if (this.props.cart && this.props.cart.length > 0) {
      this.props.cart.forEach(cartProduct => {
        grandTotalPrice += cartProduct.price * cartProduct.quantity;
      });
    }

    return (
      <React.Fragment>
        <Card style={{ width: '28rem', height: "50rem", marginTop: "1rem", marginLeft: "-1.5rem" }}>
          <Card.Header>
            Your Cart
            <FontAwesomeIcon onClick={this.clearCart} icon="trash-alt" style={{ cursor: "pointer", float: "right", width: "1.5rem", height: "1.5rem" }}/>
          </Card.Header>
          <Card.Body>
            {
              (this.props.cart.length > 0) ? (
                this.props.cart.map(cartProduct => (
                  <CartProduct
                    key={cartProduct.productID}
                    productID={cartProduct.productID}
                    productImage={cartProduct.imageURL}
                    productName={cartProduct.name}
                    price={cartProduct.price}
                    quantity={cartProduct.quantity}
                  />
                ))
              ) : "You don't have any items in the cart"
            }
          </Card.Body>

          <Button
            variant="primary"
            style={{
              width: "40%",
              background: "orange",
              borderColor: "orange",
              position: "absolute",
              bottom: "1.5rem",
              left: "1rem"
            }}
            onClick={this.placeOrder}
          >
            Place Order
          </Button>

          <h5 style={{
            position: "absolute",
            left: "13.5rem",
            bottom: "1.5rem",
            fontSize: "1.1rem"
          }}>
            Grand Total: BDT {grandTotalPrice.toFixed(2)}
          </h5>        
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  cart: state.cart.cartProducts
});

export default compose(
  connect(mapStateToProps, { removeFromCart }),
  withRouter
)(Cart);
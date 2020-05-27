import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { placeOrder } from '../../store/actions/productsActions';
import { clearCart } from '../../store/actions/cartActions';
import { clearErrors } from '../../store/actions/uiActions';
import AlertMessage from '../partials/AlertMessage';
import { clientRoutes } from "../../routes";


class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  handlePlaceOrder = () => {
    const cartProducts  = this.props.cart;
    let productsList = [];

    for (let i = 0; i < cartProducts.length; i++) {
      const product = cartProducts[i];
      const newProduct = {
        productID: product.productID,
        price: product.price,
        quantity: product.quantity
      }

      productsList.push(newProduct);
    }

    this.props.placeOrder(productsList);
  }

  componentDidUpdate() {
    if (this.props.order.success) {
      this.timer = setTimeout(() => {
        this.props.clearCart();
        this.props.clearErrors();
        this.props.history.push(clientRoutes.PRODUCTS_ROUTE)
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let totalPrice = 0;

    if (this.props.cart) {
      this.props.cart.forEach(product => {
        totalPrice += product.quantity * product.price;
      });
    }      

    return (      
      <div>
        <Link to="/">
          <FontAwesomeIcon style={{ marginTop: "2rem", width: "2rem", height: "2rem" }} icon="arrow-circle-left"></FontAwesomeIcon>
          {' '} <h3 style={{ display: "inline-block" }}>Back to products page</h3>
        </Link>
        {
          this.props.order && this.props.order.errorMessage ? (
            <AlertMessage variant="danger" message={this.props.order.errorMessage} />
          ) : ""
        }
        {
          this.props.order && this.props.order.success ? (
            <AlertMessage variant="success" message="Order placed succssfully. Redirecting you in 5 seconds." />
          ) : ""
        }
        <h1 style={{ display: "block", marginTop: "2rem", marginLeft: "auto", marginRight: "auto" }}>Confirm your order</h1>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price (BDT.)</th>
              <th>Quantity</th>
              <th>Total Price (BDT.)</th>
            </tr>
          </thead>
          <tbody>
            {
              !this.props.cart ? "" : (
                this.props.cart.map((cartProduct, index) => (
                  <tr key={cartProduct.productID}>
                    <td>{index + 1}</td>
                    <td>{cartProduct.name}</td>
                    <td>{parseFloat(cartProduct.price).toFixed(2)}</td>
                    <td>{cartProduct.quantity}</td>
                    <td>{parseFloat(cartProduct.price * cartProduct.quantity).toFixed(2)}</td>
                  </tr>
                ))
              )
            }
            {
              !this.props.cart ? "" : (
                <tr style={{ fontWeight: "bold" }}>
                  <td colSpan="4"> Total </td>
                  <td>BDT. {parseFloat(totalPrice).toFixed(2)}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
        
        {
          this.props.isWorking || this.props.order.success ? (
            <Button onClick={this.handlePlaceOrder} variant="primary" style={{ backgroundColor: "orange", borderColor: "orange" }} disabled>
              Place Order
            </Button>
          ) : 
          (
            <Button onClick={this.handlePlaceOrder} variant="primary" style={{ backgroundColor: "orange", borderColor: "orange" }}>
              Place Order
            </Button> 
          )
        }   
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  cart: state.cart.cartProducts,
  order: state.ui.order,
  isWorking: state.ui.isWorking
});

export default connect(mapStateToProps, { placeOrder, clearCart, clearErrors })(OrderPage);
import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class OrderPage extends Component {
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
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  cart: state.cart.cartProducts
});

export default connect(mapStateToProps, {})(OrderPage);
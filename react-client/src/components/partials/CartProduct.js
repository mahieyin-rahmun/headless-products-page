import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { removeFromCart, updateQuantity } from '../../store/actions/cartActions';

class CartProduct extends Component {
  onClickRemoveFromCart = (productID, event) => {
    this.props.removeFromCart(productID);
  }

  handleUpdateQuantityClick = (productID, event) => {
    switch (event.target.name) {
      case "increment":
        return this.props.updateQuantity(1, productID);
      
      case "decrement":
        return this.props.updateQuantity(-1, productID);
      
      default:
        return;
    }
  }

  render() {
    return (
      <div>
        <img
          alt="wat"
          src={this.props.productImage}
          width="15%"
          height="15%"
          style={{
            display: "inline-block",
            marginRight: "0.5rem"
          }}
        >
        </img>

        <p style={{ display: "inline-block", fontSize: "0.9em", width: "3rem", marginRight: "2rem", marginTop: "1rem", wordWrap: "break-word" }}>{this.props.productName}</p>
        
        <Form.Group style={{ display: "inline-block" }}>
          <Button variant="sm" name="increment" onClick={this.handleUpdateQuantityClick.bind(this, this.props.productID)}>+</Button>
          <Form.Control size="sm" type="text" style={{
            width: "3rem",
            display: "inline-block"
          }} value={this.props.quantity}
          readOnly/>          
          <Button variant="sm" name="decrement" onClick={this.handleUpdateQuantityClick.bind(this, this.props.productID)}>-</Button>
        </Form.Group>

        <p style={{ display: "inline-block", marginLeft: "0.5rem", marginTop: "0.5rem" }}>Price: {this.props.quantity * this.props.price}</p>
        
        <Button
          variant="danger lg"
          className="float-right"
          style={{ position: "relative", marginTop: "0.5rem", borderRadius: "50%", marginLeft: "0.5rem" }}
          onClick={this.onClickRemoveFromCart.bind(this, this.props.productID)}
        >
          <FontAwesomeIcon icon="ban" />
        </Button>
      </div>
    )
  }
}

export default connect(null, { removeFromCart, updateQuantity })(CartProduct);

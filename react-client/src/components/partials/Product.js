import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

import FavoritesButton from "../partials/FavoritesButton";
import ShoppingCartButton from "../partials/ShoppingCartButton";
import { addToCart } from '../../store/actions/cartActions';
import { addToFavorites, removeFromFavorites } from '../../store/actions/productsActions';


class Product extends Component {
  getQuantityText = (quantityType) => {
    switch (quantityType) {
      case "weight":
        return "1 kg"
      
      case "piece":
        return "1 pc"
      
      case "dozen":
        return "1 dozen"
      
      default:
        return "1 kg"
    }
  }

  addToCart = (productID, event) => {
    this.props.addToCart(productID);
  }

  toggleProductIsFavorited = (productID, isProductFavorited, event) => {
    if (isProductFavorited) {
      this.props.removeFromFavorites(productID);
    } else {
      this.props.addToFavorites(productID);
    }
  }

  render() {
    let shouldAddToCartButtonBeDisabled = false;
    let isProductFavorited = false;
    // if the product has loaded in the DOM and the cart has been fetched from the store
    if (this.props.productID && this.props.cart) {
      shouldAddToCartButtonBeDisabled = !(this.props.cart.findIndex(product => product.productID === this.props.productID) === -1);
    }

    if (this.props.favoritesList) {
      isProductFavorited = !(this.props.favoritesList.findIndex(productID => productID === this.props.productID) === -1);
    }

    return (
      <React.Fragment>
        <Card style={{ width: '15rem', margin: "1rem" }}>
          <Card.Img variant="top" src={this.props.productImage} />
          {
            isProductFavorited ? (
              <FavoritesButton
                onClick={this.toggleProductIsFavorited.bind(this, this.props.productID, isProductFavorited)}
                icon={["fas", "heart"]}
              />
              
            ) :
            <FavoritesButton
              onClick={this.toggleProductIsFavorited.bind(this, this.props.productID, isProductFavorited)}
              icon={["far", "heart"]}  
            />
          }
          <Card.Body>
            <Card.Title>{this.props.productName}</Card.Title>
            <Card.Text>
              Quantity: {this.getQuantityText(this.props.quantityType)}
            </Card.Text>
            <Card.Title>Price: BDT {this.props.price}</Card.Title>
            {
              shouldAddToCartButtonBeDisabled ? (
                <ShoppingCartButton disabled={true} onClick={this.addToCart.bind(this, this.props.productID)} />
              ) : (
                <ShoppingCartButton disabled={false} onClick={this.addToCart.bind(this, this.props.productID)} />
              )
            }
          </Card.Body>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  cart: state.cart.cartProducts,
  favoritesList: state.products.favoritesList
});

export default connect(mapStateToProps, { addToCart, addToFavorites, removeFromFavorites })(Product);

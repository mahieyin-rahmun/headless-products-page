import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from './Product';
import { fetchProducts, getFavoriteProducts } from '../../store/actions/productsActions';

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.getFavoriteProducts();
  }

  render() {
    return (
      <div className="row">
        <React.Fragment>
          {
            this.props.products ? (
              this.props.products.map(product => (
                <Product
                  className="col-3"
                  key={product.productID}
                  productID={product.productID}
                  quantityType={product.quantityType}
                  productName={product.name}
                  price={product.price}
                  productImage={product.imageURL}
                />
              ))
            ) : ""  
          }
        </React.Fragment>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  products: state.products.productsList,
  isVerifyingToken: state.ui.isVerifyingToken
});

export default connect(mapStateToProps, { fetchProducts, getFavoriteProducts })(Products);

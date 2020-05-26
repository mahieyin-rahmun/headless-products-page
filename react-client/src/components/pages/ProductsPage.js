import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../partials/Products';
import Cart from '../partials/Cart';
import AlertMessage from '../partials/AlertMessage';

class ProductsPage extends Component {
  render() {
    return (
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col-9">          
          {
            this.props.isWorking ? (
              <React.Fragment>
                <AlertMessage style={{ display: "inline-block" }} variant="info" message="Working, please wait..." useSpinner={true} />
              </React.Fragment>
            ) : ""
          }
          <Products />
        </div>
        <div className="col-3">
          <Cart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isWorking: state.ui.isWorking
});

export default connect(mapStateToProps, {})(ProductsPage);

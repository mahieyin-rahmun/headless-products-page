import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { clientRoutes } from "./routes";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faShoppingCart, faHeart as faSolidHeart, faBan, faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { far, faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import NavigationBar from './components/partials/NavigationBar';
import ProductsPage from './components/pages/ProductsPage';
import LoginPage from "./components/pages/LoginPage";
import OrderPage from './components/pages/OrderPage';
import SignupPage from './components/pages/SignupPage';
import OrdersPage from './components/pages/OrdersPage';
import ErrorPage from "./components/pages/404Page";

import isAuthenticated from "./components/hoc/isAuthenticated";
import isNotAuthenticated from "./components/hoc/isNotAuthenticated";

library.add(fas, far, fab, faGoogle, faSolidHeart, faRegularHeart, faShoppingCart, faBan, faArrowAltCircleLeft, faTrashAlt);

class App extends Component {
  render() {
    return this.props.isVerifyingToken ? null : (
      <div> 
        <Router>
          <NavigationBar /> 
          <Container>          
            <Switch>
              <Route exact path={clientRoutes.LOGIN_ROUTE} component={isNotAuthenticated(LoginPage)} />
              <Route exact path={clientRoutes.LOGIN_FAILURE_ROUTE} component={isNotAuthenticated(LoginPage)} />
              <Route exact path={clientRoutes.LOGIN_SUCCESS_ROUTE} component={isNotAuthenticated(LoginPage)} />

              <Route exact path={clientRoutes.SIGNUP_ROUTE} component={isNotAuthenticated(SignupPage)} />

              <Route exact path={clientRoutes.ORDER_ROUTE} component={isAuthenticated(OrderPage)} />
              <Route exact path={clientRoutes.ORDERS_ROUTE} component={isAuthenticated(OrdersPage)} />

              <Route exact path={clientRoutes.PRODUCTS_ROUTE} component={isAuthenticated(ProductsPage)} />

              <Route component={ErrorPage} />
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isVerifyingToken: state.ui.isVerifyingToken
});

export default connect(mapStateToProps, {})(App);

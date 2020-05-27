import React, { Component } from 'react';
import { connect } from "react-redux";
import { Nav, Navbar } from 'react-bootstrap';
import { logout } from "../../store/actions/authActions";
import { clientRoutes } from '../../routes';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="orange" sticky="top" style={{ background: "orange" }} expand="lg">
          <Navbar.Brand>Headless Products Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              this.props.isUserAuthenticated ?
                (
                  <Nav className="mr-auto">
                    <Link style={{ textDecoration: "none", color: "white" }} to={clientRoutes.ORDERS_ROUTE}> View Orders </Link>
                  </Nav>
                ) : (
                  <Nav className="mr-auto">
                    <Nav.Link href={clientRoutes.LOGIN_ROUTE}>Login</Nav.Link>
                    <Nav.Link href={clientRoutes.SIGNUP_ROUTE}>Signup</Nav.Link>
                  </Nav>
                )
            }
            <Nav className="ml-auto">
              {
                this.props.isUserAuthenticated ?
                  <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link> : ""
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  isUserAuthenticated: state.auth.isUserAuthenticated
});

export default connect(mapStateToProps, { logout })(NavigationBar);

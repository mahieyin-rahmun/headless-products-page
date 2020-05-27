import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table } from 'react-bootstrap';
import { fetchOrders } from '../../store/actions/productsActions';
import AlertMessage from '../partials/AlertMessage';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OrdersPage extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div>
        <Link to="/">
          <FontAwesomeIcon style={{ marginTop: "2rem", width: "2rem", height: "2rem" }} icon="arrow-circle-left"></FontAwesomeIcon>
          {' '} <h3 style={{ display: "inline-block" }}>Back to products page</h3>
        </Link>
        {
          this.props.isWorking ? (
            <AlertMessage variant="info" message="Loading orders..." useSpinner={true} />
          ) : ""
        }
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Created At</th>
              <th>Total Price (BDT.)</th>
            </tr>
          </thead>
          <tbody>
            {              
              this.props.orders ? (
                this.props.orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.orderID}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.totalAmount}</td>
                  </tr>
                ))
              ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
  orders: state.products.ordersList,
  isWorking: state.ui.isWorking
});

export default connect(mapStateToProps, { fetchOrders })(OrdersPage);

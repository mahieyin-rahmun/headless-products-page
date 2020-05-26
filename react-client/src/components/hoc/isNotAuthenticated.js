import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clientRoutes } from "../../routes";

function isNotAuthenticated (WrappedComponent) {
	return class EnhancedComponent extends Component {
		render() {
			return (
				<React.Fragment>
					{
						!this.props.isUserAuthenticated ? 
						<WrappedComponent {...this.props} /> : 
						<Redirect to={clientRoutes.PRODUCTS_ROUTE} />
					}
				</React.Fragment>
			)
		}
	}
}

const mapStateToProps = (state, props) => ({
	isUserAuthenticated: state.auth.isUserAuthenticated
});

export default compose(
	connect(mapStateToProps, {}), 
	isNotAuthenticated
);
import React, { Component } from 'react';
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginLocal, loginOauthSuccess } from "../../store/actions/authActions";
import { loginError } from "../../store/actions/uiActions";
import AlertMessage from "../partials/AlertMessage";

import { clientRoutes, backendRoutes } from "../../routes";

class LoginPage extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: ""
		}
	}

	onGoogleLoginClick = () => {
		window.open(backendRoutes.GOOGLE_OAUTH_LOGIN, "_self");
	}

	onLoginClick = (event) => {
		event.preventDefault();
		const { email, password } = this.state;

		// validate
		if (email === "" || password === "") {
			return this.props.loginError("Please fill in all the fields!");
		}
		
		this.props.loginLocal(email, password);
	}

	onHandleTextFieldChange = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		});
	}

	componentDidMount() {
		if(this.props.match.params.data) {
			let messagesArray = this.props.match.params.data.split("&");

			let messageType = messagesArray[0].split("=")[1];

			if (messageType === "error") {
				this.props.loginError(messagesArray[1].split("=")[1]);
				this.props.history.push(clientRoutes.LOGIN_ROUTE);
			} else {
				let token = messagesArray[1].split("=")[1];
				this.props.loginOauthSuccess(token);
				this.props.history.push(clientRoutes.PRODUCTS_ROUTE);
			}
		}
	}

	render() {
		return (
			<React.Fragment>
				<Card style={{ marginTop: "2rem", width: "30rem", display: "block", marginLeft: "auto", marginRight: "auto" }}>
					{
						this.props.loginErrorState.error && this.props.loginErrorState.errorMessage ? (
							<AlertMessage variant="danger" message={this.props.loginErrorState.errorMessage} />
						) : ""
					}
					<Card.Header>
						<h1 style={{textAlign: "center"}}>Login</h1>
					</Card.Header>

					<Card.Body>
						<Form>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control onChange={this.onHandleTextFieldChange} type="email" name="email" placeholder="e.g. myawesome.email@gmail.com" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control onChange={this.onHandleTextFieldChange} type="password" name="password" placeholder="Your Secure Password" />
						  </Form.Group>

						  <Button style={{ display: "block", marginLeft: "auto", marginRight: "auto", background: "orange", borderColor: "orange" }} variant="primary" type="submit" onClick={this.onLoginClick}>
								{
									this.props.isWorking ? (
										<Spinner animation="border" role="status" size="sm">
											<span className="sr-only">Please Wait</span>
										</Spinner>
									) : "Login"
								}
							</Button>
							
						</Form>
						<p className="text mt-4" style={{ textAlign: "center" }}>Alternatively, you can sign in using one of the following providers: </p>
						<Button style={{ background: "red", borderColor: "red", display: "block", marginTop: "2rem", marginLeft: "auto", marginRight: "auto" }} onClick={this.onGoogleLoginClick}> 
							<FontAwesomeIcon className="mr-3" icon={["fab", "google"]}></FontAwesomeIcon>
							Login With Google 
						</Button>
					</Card.Body>
				</Card>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, props) => ({
	loginErrorState: state.ui.login,
	isWorking: state.ui.isWorking
});

export default connect(mapStateToProps, { loginLocal, loginOauthSuccess, loginError })(LoginPage);
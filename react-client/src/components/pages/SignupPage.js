import React, { Component } from 'react';
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { signupLocal } from "../../store/actions/authActions";
import { signupError } from "../../store/actions/uiActions";
import AlertMessage from "../partials/AlertMessage";
import { backendRoutes } from "../../routes";


class SignupPage extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			username: "",
			password: ""
		}
	}

	onGoogleLoginClick = () => {
		window.open(backendRoutes.GOOGLE_OAUTH_LOGIN, "_self");
	}

	onSignupClick = (event) => {
		event.preventDefault();
		const { email, password, username } = this.state;

		if (email === "" || password === "" || username === "") {
			return this.props.signupError("Please fill in all the required fields!");
		}

		if (password.length < 6) {
			return this.props.signupError("Password must be at least 6 characters long!");
		}

		if (username.length < 4) {
			return this.props.signupError("Username must be at least 4 characters long!");
		}

		if (!/^[a-zA-Z0-9_]+$/.test(username)) {
			return this.props.signupError("Username can only contain alphabets, numbers and underscores!");
		}

		if (!/^[a-zA-Z0-9_.]+@[a-z]+\.[a-z]+$/.test(email)) {
			return this.props.signupError("Invalid email");
		}

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
			return this.props.signupError("Passwords must be a combination of uppercase letters, lowercase letters and numbers");
		}

		this.props.signupLocal(username, email, password);
	}

	onHandleTextFieldChange = (event) => {
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		});
	}

	render() {
		return (
			<React.Fragment>
				<Card style={{ marginTop: "2rem", width: "30rem", display: "block", marginLeft: "auto", marginRight: "auto" }}>
					{
						this.props.signupErrorState.error && this.props.signupErrorState.errorMessage ? (
							<AlertMessage variant="danger" message={this.props.signupErrorState.errorMessage} />
						) : ""
					}
					<Card.Header>
						<h1 style={{textAlign: "center"}}>Sign Up</h1>
					</Card.Header>

					<Card.Body>
						<Form>
							<Form.Group controlId="formBasicUsername">
								<Form.Label>Username</Form.Label>
								<Form.Control onChange={this.onHandleTextFieldChange} type="text" name="username" placeholder="e.g. myawesome_name" />
							</Form.Group>

						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control onChange={this.onHandleTextFieldChange} type="email" name="email" placeholder="e.g. myawesome.email@gmail.com" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control onChange={this.onHandleTextFieldChange} type="password" name="password" placeholder="Your Secure Password" />
						  </Form.Group>

						  <Button style={{ display: "block", marginLeft: "auto", marginRight: "auto", background: "orange", borderColor: "orange" }} variant="primary" type="submit" onClick={this.onSignupClick}>
								{
									this.props.isWorking ? (
										<Spinner animation="border" role="status" size="sm">
											<span className="sr-only">Please Wait</span>
										</Spinner>
									) : "Sign Up"
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
	signupErrorState: state.ui.signup,
	isWorking: state.ui.isWorking
});

export default connect(mapStateToProps, { signupLocal, signupError })(SignupPage);
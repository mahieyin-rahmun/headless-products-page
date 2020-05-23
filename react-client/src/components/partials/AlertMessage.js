import React from "react";
import { Alert, Spinner } from "react-bootstrap";


const AlertMessage = (props) => {
	return (
		<Alert style={{ marginTop: "1rem", width: "100%", display: "block", marginLeft: "auto", marginRight: "auto" }} variant={props.variant}>
			{
				props.useSpinner ? (<Spinner style={{ display: "inline-block", marginRight: "2rem" }} animation="border" role="status" variant="sm" />) : ""
			}		
			{props.message}
  	</Alert>
	);
}

export default AlertMessage;
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ErrorPage() {
  return (
    <div className="mt-4" style={{ display: "inline-block", marginLeft: "auto", marginRight: "auto" }}>
      <h1>The page was not found.</h1>
      <Link to="/">
        <FontAwesomeIcon style={{ marginTop: "2rem", width: "2rem", height: "2rem" }} icon="arrow-circle-left"></FontAwesomeIcon>
        {' '} <h3 style={{ display: "inline-block" }}>Back to products page</h3>
      </Link>
    </div>
  )
}

export default ErrorPage;

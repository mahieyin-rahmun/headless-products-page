import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShoppingCartButton = (props) => {
  return (
    <Button
      variant="primary"
      className="float-right"
      style={{
        borderRadius: "50%",
        background: "orange",
        borderColor: "orange"
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
    </Button>
  )
}

export default ShoppingCartButton;
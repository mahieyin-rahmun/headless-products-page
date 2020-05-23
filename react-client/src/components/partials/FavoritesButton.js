import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoritesButton = (props) => {
  return (
    <Button
      variant="primary"
      className="float-right"
      style={{
        borderRadius: "50%",
        background: "orange",
        borderColor: "orange",
        position: "absolute",
        top: "1rem",
        right: "1rem"
      }}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={props.icon} />
    </Button>
  )
}

export default FavoritesButton;
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissibleExample({ Message, state }) {
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{Message.message}</p>
      </Alert>
    );
  }
}

export default AlertDismissibleExample;

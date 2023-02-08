import React, { useState } from "react";
import { Row, Col, Button, Form, Card, CardGroup } from "react-bootstrap";
import axios from "axios";
import "./registration-view.css";
import Navigate from "./navbar";
import horntrax from "./Images/HornTrax-180.png";
export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  //Declare variable for registration endpoint
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be minimum 5 characters long.");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be 5 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email is required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Please enter a valid email");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    let isReq;
    e.preventDefault();
    isReq = validate();
    console.log(username, password, email);
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://horntrax-api.herokuapp.com/users/add", {
          username: username,
          password: password,
          email: email,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("User added successfully, please login!");
          window.open("/client-loaners_project", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }

    // /* then call props.Registration(username) */
    // props.onRegistration(username);
  };

  return (
    <>
      <Navigate></Navigate>
      <Row className="mt-5">
        <Col className="registration" sm={10} md={8}>
          <CardGroup>
            <Card Card border="light">
              <Card.Body className="register_container">
                <Card.Title>Please register a new user</Card.Title>

                <Card.Title>
                  <img src={horntrax} alt="logo" />
                </Card.Title>
                <Form>
                  <Form.Group
                    controlId="formUsername"
                    className="reg-form-inputs"
                  >
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameErr && (
                      <p style={{ color: "red" }} className="font-italic">
                        {usernameErr}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group
                    controlId="formPassword"
                    className="reg-form-inputs"
                  >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordErr && (
                      <p style={{ color: "red" }} className="font-italic">
                        {passwordErr}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="Email" className="reg-form-inputs">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailErr && (
                      <p style={{ color: "red" }} className="font-italic">
                        {emailErr}
                      </p>
                    )}
                  </Form.Group>
                  <div className="registerButton">
                    {" "}
                    <Button variant="info" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>

                  <p></p>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </>
  );
}

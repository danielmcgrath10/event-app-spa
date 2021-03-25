import React, { useState } from "react";
import "./login.scss";
import { Button, Form } from "react-bootstrap";

export default function Login(props) {
  let [create, setCreate] = useState(false);
  let [validated, setValidated] = useState(false);

  const loginApi = (name, password) => {
    
  }

  const handleLoginSubmit = (e) => {
    console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  const createApi = () => {

  }

  const handleCreateSubmit = (e) => {
    console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };

  const changePage = () => {
      setCreate(!create);
      setValidated(false);
  }

  return (
    <div id="login">
      {create ? (
        <>
          <Form noValidate validated={validated} onSubmit={handleCreateSubmit}>
            <Form.Group controlId={"formBasicText"}>
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group controlId={"formBasicEmail"}>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
            </Form.Group>
            <Button variant={"primary"} type="submit">
              Login
            </Button>
          </Form>
          <a class={"login-switch"} onClick={changePage}>
            Login
          </a>
        </>
      ) : (
        <>
          <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
            <Form.Group controlId={"formBasicEmail"}>
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
            </Form.Group>
            <Button variant={"primary"} type="submit">
              Login
            </Button>
          </Form>
          <a class={"login-switch"} onClick={changePage}>
            Create Account
          </a>
        </>
      )}
    </div>
  );
}

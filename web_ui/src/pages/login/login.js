// This is influence by the notes
import React, { useState } from "react";
import "./login.scss";
import { Button, Form } from "react-bootstrap";
import pick from "lodash/pick";
import {connect} from "react-redux";
import {api_login, create_user, getUsers, get_events} from "../../api";

function Login(props) {
  const [create, setCreate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({name: "", email: "", password: ""});

  const update = (field, ev) => {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    setUser(u1);
  }

  const loginApi = (email, password) => {
    api_login(email, password);
    get_events();
    getUsers();
  }

  const handleLoginSubmit = (e) => {
    console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
      let data = pick(user, ['email', 'password'])
      loginApi(data.email, data.password);
    }
    setValidated(true);
  };

  const createApi = () => {
    let data = pick(user, ["name", "email", "password"]);
    create_user(data).then(() => {
      loginApi(data.email, data.password);
    })
  }

  const handleCreateSubmit = (e) => {
    console.log(e);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("hello world")
    } else {
      e.preventDefault();
      e.stopPropagation();
      createApi();
    }
    setValidated(true);
  };

  const changePage = () => {
      setCreate(!create);
      setValidated(false);
      setUser({name: "", email: "", password: ""});
  }

  return (
    <div id="login">
      {create ? (
        <>
          <Form noValidate validated={validated} onSubmit={handleCreateSubmit}>
            <Form.Group controlId={"formBasicText"}>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                required 
                type="text" 
                placeholder="Enter Name" 
                value={user.name}
                onChange={(ev) => update("name", ev)}
              />
            </Form.Group>
            <Form.Group controlId={"formBasicEmail"}>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                required 
                type="email" 
                placeholder="Enter Email" 
                value={user.email}
                onChange={(ev) => update("email", ev)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                required 
                type="password" 
                placeholder="Password" 
                value={user.password}
                onChange={(ev) => update("password", ev)}
              />
            </Form.Group>
            <Button variant={"primary"} type="submit">
              Login
            </Button>
          </Form>
          <a className={"login-switch"} onClick={changePage}>
            Login
          </a>
        </>
      ) : (
        <>
          <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
            <Form.Group controlId={"formBasicEmail"}>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                required 
                type="email" 
                placeholder="Enter Email" 
                value={user.email}
                onChange={(ev) => update("email", ev)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                required 
                type="password" 
                placeholder="Password" 
                value={user.password}
                onChange={(ev) => update("password", ev)}
              />
            </Form.Group>
            <Button variant={"primary"} type="submit">
              Login
            </Button>
          </Form>
          <a className={"login-switch"} onClick={changePage}>
            Create Account
          </a>
        </>
      )}
    </div>
  );
}

function state2props() {
  return {};
}

export default connect(state2props)(Login)
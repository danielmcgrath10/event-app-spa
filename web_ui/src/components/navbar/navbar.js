// This section is influenced by the notes
import React from "react";
import "./navbar.scss";
import { Nav } from "react-bootstrap";
import _ from "lodash";
import store from "../../store";
import { connect } from "react-redux";

function Navbar({ session }) {
  let pages = ["home", "users"];
  const logout = (e) => {
    e.preventDefault();
    store.dispatch({ type: "session/clear" });
  };
  const popNav = () => {
    return pages.map((page, index) => (
      <Nav.Item key={index}>
        <Nav.Link href={`/${page}`}>{_.upperFirst(page)}</Nav.Link>
      </Nav.Item>
    ));
  };
  return (
    <Nav id={"nav"}>
      <div id={"nav-left"}>{popNav()}</div>
      {session ? (
        <div id={"nav-right"}>
          <Nav.Item>
            <Nav.Link href={`/users/${session.user_id}`}>
              {session.email}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav.Item>
        </div>
      ) : null}
    </Nav>
  );
}

export default connect(({ session }) => ({ session }))(Navbar);

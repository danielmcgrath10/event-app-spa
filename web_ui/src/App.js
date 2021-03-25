import React, { Suspense } from "react";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import EventFeed from "./pages/event_feed/event-feed";
import Navbar from "./components/navbar/navbar";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Users from "./pages/users/users";
import Login from "./pages/login/login";
import { connect } from "react-redux";

function App({ error, session }) {
  // Taken from the notes
  let error_row = null;
  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }
  return (
    <Container fluid className="App">
      {session ? (
        <>
          <Navbar session={session} />
          {error_row}
            <Switch>
              {/* <Route
                  path={'/login'}
                /> */}
              <Route
                path={"/home"}
                render={(props) => <EventFeed {...props} />}
              />
              <Route path={"/users"} render={(props) => <Users {...props} />} />
              <Route exact path={"/"}>
                <Redirect to={"/home"} />
              </Route>
            </Switch>
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default connect(({ error, session }) => ({ error, session }))(App);

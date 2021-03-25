import React, {Suspense, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Route, Switch, Redirect} from "react-router-dom";
import EventFeed from './pages/event_feed/event-feed';
import Navbar from './components/navbar/navbar';
import { Container } from 'react-bootstrap';
import Users from './pages/users/users';
import Login from './pages/login/login';

function App(props) {
  let [curUser, setCurUser] = useState(null);
  return (
    <Container fluid className="App">
      {
        curUser ?
          <>
            <Navbar/>
            <Suspense>
              <Switch>
                {/* <Route
                  path={'/login'}
                /> */}
                <Route
                  path={'/home'}
                  render={(props) => (
                    <EventFeed {...props}/>
                  )}
                />
                <Route
                  path={'/users'}
                  render={(props) => (
                    <Users {...props}/>
                  )}
                />
                <Route exact path={"/"}>
                  <Redirect to={"/home"} />
                </Route>
              </Switch>
            </Suspense>
          </>
        :
          <Login/>
      }
    </Container>
  );
}

export default App;

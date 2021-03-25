// This section is influenced by the notes
import React from "react";
import "./navbar.scss";
import {Button, Nav} from "react-bootstrap";
import _ from 'lodash';
import store from '../../store';

export default function Navbar({session}) {
    let pages = ["home", "users", "invites"];

    const logout = (e) => {
        e.preventDefault();
        store.dispatch({type: 'session/clear'})
    }
    const popNav = () => {
        return (
            pages.map((page) => (
                <Nav.Item>
                    <Nav.Link href={`/${page}`}>{_.upperFirst(page)}</Nav.Link>
                </Nav.Item>
            ))
        )
    }
    return (
        <Nav id={"nav"} >
            <div id={"nav-left"}>
                {popNav()}
            </div>
            {
                session ? 
                    <div id={"nav-right"}>
                        <Nav.Item>
                            <Nav.Link href={`/users/${session.id}`}>{session.name}</Nav.Link>
                        </Nav.Item>
                        <Button onClick={logout}>
                            Logout
                        </Button>
                    </div>
                :
                    null
            }
        </Nav>
    )
}
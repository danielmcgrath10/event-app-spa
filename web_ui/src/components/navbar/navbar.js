import React from "react";
import "./navbar.scss";
import {Nav} from "react-bootstrap";
import _ from 'lodash';

export default function Navbar(props) {
    const {
        user
    } = props;
    let pages = ["home", "users", "invites"];
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
            {/* <div id={"nav-right"}>
                <Nav.Item>
                    <Nav.Link href={`/users/${user.id}`}>{user.name}</Nav.Link>
                </Nav.Item>
            </div> */}
        </Nav>
    )
}
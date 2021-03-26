import _, { pick } from "lodash";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import { getUsers, update_user } from "../../api";

export default function UserView({users, session}){
    let {id} = useParams();
    let user = _.find(users, ["id", _.toNumber(id)]);
    const history = useHistory();
    const [userModal, setUserModal] = useState(false);
    const [userEdit, setUser] = useState({name: "", email: ""})
    const [userEditValidated, setValidated] = useState(false);

    useEffect(() => {
        if(user) {
            setUser({name: user.name , email:user.email})
        }
    }, [user])

    const onHide = () => {
        setValidated(false);
        setUserModal(false);
    }

    const editUser = () => {
        console.log("made ot");
        let data = pick(userEdit, ["name", "email"]);
        update_user(user.id, data, session).then(() => onHide());
    }

    const handleUserEditSubmit = (e) =>{
        const form =  e.currentTarget;
        e.stopPropagation();
        e.preventDefault();

        if(form.checkValidity() === true){
            editUser();
        }

        setValidated(true);
    }

    const update = (field, ev) => {
        let u1 = Object.assign({}, userEdit);
        if(ev === "date") {
            u1[field] = ev;
        } else {
            u1[field] = ev.target.value;
        }
        setUser(u1);
    }

    const toggleOn = () => setUserModal(true);

    return(
        <>
            {
                user ? 
                    <>
                        <Row>
                            <Col>
                                <Button
                                    onClick={() => history.goBack()}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    active={_.isEqual(session.id, user.id)}
                                    onClick={toggleOn}
                                >
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col>
                                {
                                    !_.isEmpty(users) ?
                                        <h1>{user.name}</h1>
                                    :
                                        null
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    !_.isEmpty(users) ?
                                    <h2>{user.email}</h2>
                                :
                                    null
                                }
                            </Col>
                        </Row>
                        <Modal show={userModal} onHide={onHide} centered>
                            <Modal.Header closeButton>
                                Edit User
                            </Modal.Header>
                            <Modal.Body>
                                <Form noValidate validated={userEditValidated} onSubmit={handleUserEditSubmit}>
                                    <Form.Group>
                                        <Form.Label>
                                            Name
                                        </Form.Label>
                                        <Form.Control required type={"text"} value={userEdit.name} onChange={(e)=>update("name", e)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Email
                                        </Form.Label>
                                        <Form.Control required type={"text"} value={userEdit.email} onChange={(e)=>update("email", e)} />
                                    </Form.Group>
                                    <Button
                                        variant={"primary"}
                                        type={"submit"}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </>
                :
                    null
            }
        </>
    );
}   
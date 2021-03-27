import _, { pick } from "lodash";
import "./event-feed.scss";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { create_event, get_events } from "../../api";
import "react-datepicker/dist/react-datepicker.css";

export default function EventFeed({events, session}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [validated, setValidated] = useState(false);
    const [event, setEvent] = useState({name: "", date: "", body: ""});

    const onHide = () => {
        setValidated(false);
        setEvent({name: "", date: "", body: ""});
        setModalOpen(false);
    };
    const toggleOpen = () => setModalOpen(true);

    const submitEvent = () => {
        let data = pick(event, ["name", "date", "body"]);
        create_event(data, session).then(() => onHide());
    }

    const handleCreateEvent = (e) => {
        const form = e.currentTarget;
        e.stopPropagation();
        e.preventDefault();

        if(form.checkValidity() === true){
            submitEvent();
        }
        setValidated(true);
    }

    const update = (field, ev) => {
        let u1 = Object.assign({}, event);
        u1[field] = ev.target.value;
        setEvent(u1);
    }

    const populateFeed = () => {
        if(events){
            return(
                events.map((event, index) => (
                    <div className="card feed-card" key={index}>
                        <div className="card-header">
                            {
                                (event.user.id === session.user_id) || _.find(event.invites, ["email", session.email])?
                                    <h3><a href={`/events/${event.id}`}>{event.name}</a></h3>
                                :
                                    <h3>{event.name}</h3>
                            }
                        </div>
                        <div className="card-body">
                        <div className="row">
                            <Col>Owner: {event.user.name}</Col>
                        </div>
                        <Row>
                            <Col>Date: {event.date}</Col>
                        </Row>
                        <Row>
                            <Col>Comments: {_.has(event, 'comments') ? event.comments.length : 0}</Col>
                        </Row>
                        </div>
                    </div>
                ))
            )
        } else {
            return (
                <div className={"col"}>
                    <h3>No Events</h3>
                </div>
            )
        }
        
    }

    return(
        <div>
            <div className="row">
                <div className="col act-feed-header">
                    <h1>Activity Feed</h1>
                    <Button
                        className={"act-feed-new"}
                        onClick={toggleOpen}
                    >
                        Create Event
                    </Button>
                    <Modal show={modalOpen} onHide={onHide} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Create Event
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate validated={validated} onSubmit={handleCreateEvent}>
                                <Form.Group>
                                    <Form.Label>Event Name:</Form.Label>
                                    <Form.Control required type={"text"} placeholder={"Event Name"} onChange={(e) => update("name", e)}/>
                                </Form.Group>
                                <Form.Group className={"date-picker-group"}>
                                    <Form.Label>Event Date:</Form.Label>
                                    <Form.Control required type={"date"} onChange={(e) => update("date", e)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Event Description:</Form.Label>
                                    <Form.Control required as={"textarea"} rows={3} onChange={(e) => update("body", e)}/>
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
                </div>
            </div>
            <div className="row px-4">
                {populateFeed()}
            </div>
      </div>
    )
}
import _ from "lodash";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { add_comment } from "../../api";
import "./comment.scss";

export default function Comment({event, session}) {
    const [comVal, setComVal] = useState(false);
    const [comment, setComment] = useState({body: ""});

    const clearInput = () => {
        setComVal(false);
        setComment({body: ""});
    }

    const subCom = () => {
        let data = _.pick(comment, ["body"]);
        data["user_id"] = session.user_id;
        data["event_id"] = event.id;
        add_comment(data).then(() => clearInput());
    }

    const handleComSubmit = (e) => {
        const form = e.currentTarget;
        e.stopPropagation();
        e.preventDefault();

        if(form.checkValidity() === true){
            subCom();
        }

        setComVal(true);
    }
    const update = (field, e) => {
        let u1 = Object.assign({}, comment);
        u1[field] = e.target.value;
        setComment(u1);
    }

    return(
        <Form noValidate validated={comVal} onSubmit={handleComSubmit}>
            <Form.Group>
                <Form.Control required as={"textarea"} rows={3} value={comment.body} onChange={e => update("body", e)}/>
            </Form.Group>
            <Button
                variant={"primary"}
                type={"submit"}
            >
                Submit
            </Button>
        </Form>
    );
}
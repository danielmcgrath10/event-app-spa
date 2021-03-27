// Influenced by course notes
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./invite.scss";
import _ from "lodash";
import { add_invite } from "../../api";

export default function Invite({ event, session }) {
  const [invVal, setInvVal] = useState(false);
  const [invite, setInvite] = useState({ email: "" });

  const clearInput = () => {
    setInvVal(false);
    setInvite({ email: "" });
  };

  const subInv = () => {
    let data = _.pick(invite, ["email"]);
    data["event_id"] = event.id;
    data["user_id"] = session.user_id;
    add_invite(data, session).then(() => clearInput());
  };

  const handleInvSubmit = (e) => {
    const form = e.currentTarget;
    e.stopPropagation();
    e.preventDefault();

    if (form.checkValidity() === true) {
      subInv();
    }

    setInvVal(true);
  };
  const update = (field, e) => {
    let u1 = Object.assign({}, invite);
    u1[field] = e.target.value;
    setInvite(u1);
  };

  return (
    <Form noValidate validated={invVal} onSubmit={handleInvSubmit}>
      <Form.Group>
        <Form.Control
          required
          type={"text"}
          placeholder={"User Email"}
          value={invite.email}
          onChange={(e) => update("email", e)}
        />
      </Form.Group>
      <Button variant={"primary"} type={"submit"}>
        Submit
      </Button>
    </Form>
  );
}

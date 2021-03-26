import _ from "lodash";
import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { del_comment, del_invite, upd_invite } from "../../api";
import Comment from "../../components/comment/comment";
import Invite from "../../components/invite/invite";
import "./event.scss";

export default function EventView({ events, session }) {
  let { id } = useParams();
  let event = _.find(events, ["id", _.toNumber(id)]);
  console.log(event);

  const handleDelCom = (id) => {
    del_comment(id);
  }

  const handleDelInv = (id) => {
      del_invite(id);
  }

  const handleUpdateInvite = (val) => {
    let invite_id = _.find(event.invites, ["email", session.email])["id"];
    console.log(invite_id, val)
    upd_invite(invite_id, val);
  }

  const populateComments = () => {
    return (
        event.comments.map((comment, index) => (
            <Card className={"comment-card"} body key={index}>
                <Row className={"comment-card-row"}>
                    {comment.user.name}
                    {
                        (event.user.id === session.user_id) || (comment.user_id === session.user_id ) ?
                            <a className={"click-elem"} onClick={() => handleDelCom(comment.id)}>x</a>
                        :
                            null
                    }
                </Row>
                <Row>
                    {comment.body}
                </Row>
            </Card>
        ))
    );
  }

  const populateInvites = () => {
      return(
          event.invites.map((invite, index) => (
              <tr key={index}>
                  <td>
                        {invite.email}
                  </td>
                  <td>
                        {invite.url}
                  </td>
                  <td>
                      {invite.accept.toString()}
                  </td>
                  {
                      event.user.id === session.user_id ?
                        <td>
                            <a className={"click-elem"} onClick={() => handleDelInv(invite.id)}>x</a>
                        </td>
                    :
                        null
                  }
              </tr>
          ))
      )
  }

  return (
    <div>
      {event && ((event.user.id === session.user_id) || (_.find(event.invites, ["email", session.email]))) ? (
        <>
          <Row>
            <Col>
              <h1>{event.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>{event.user.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Date: {event.date}</h2>
            </Col>
            <Col>
              <h2>{event.body}</h2>
            </Col>
          </Row>
          <hr />
          <br />
          <Row id={"comment-row"}>
            <Col className={"event-row"}>
              <h2>Comments</h2>
                <Comment event={event} session={session} />
              <hr />
              {populateComments()}
            </Col>
            <Col className={"event-row"}>
                <h2>Invites</h2>
                {
                    event.user.id === session.user_id ?
                        <Invite event={event} session={session}/>
                    :
                      _.find(event.invites, ["email", session.email])?
                        <Row>
                          <Col>
                            <Button
                              onClick={() => handleUpdateInvite(true)}
                            >
                              Accept
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              variant={'danger'}
                              onClick={() => handleUpdateInvite(false)}
                            >
                              Deny
                            </Button>
                          </Col>
                        </Row>
                      :
                        null
                }

                <hr/>
                <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>URL</th>
                        <th>Going?</th>
                      </tr>
                    </thead>
                    <tbody>
                    {populateInvites()}
                    </tbody>
                </Table>
            </Col>
          </Row>
        </>
      ) : <h1>Sorry, You either Don't have access or there was an error</h1>}
    </div>
  );
}

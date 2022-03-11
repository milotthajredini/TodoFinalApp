import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createUser } from "../../actions/userAction";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { fetchUsers } from "../../actions/userAction";

import { Link } from "react-router-dom";
function CreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(true);
  let navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate("/user-list");
  };
  function submitUser(e) {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
    };
    props.createUser(user).then(() => {
      props.fetchUsers();
      navigate("/user-list");
    });
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Smith"
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Link to="/user-list">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Link>
              <Form.Group>
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Form.Group>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
CreateUser.propsTypes = {
  fetchUsers: PropTypes.func.isRequired,
};

export default connect(null, { createUser, fetchUsers })(CreateUser);

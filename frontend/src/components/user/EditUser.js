import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editUser } from "../../actions/userAction";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router";

function EditUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(true);
  let navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate("/user-list");
  };
  useEffect(() => {
    setName(props?.currentUser?.name);
    setEmail(props?.currentUser?.email);
  }, [props?.currentUser]);

  function submitEditedUser(e) {
    e.preventDefault();

    let user = {
      name: name,
      email: email,
    };
    props.editUser(props.currentUser?.id, user);
    navigate("/user-list");
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitEditedUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Smith"
                onChange={(event) => setName(event.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </Form.Group>
            <Modal.Footer>
              <Link to="/user-list">
                <Button variant="secondary">Close</Button>
              </Link>
              <Form.Group>
                <Button variant="primary" type="submit" onClick={handleClose}>
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

EditUser.propTypes = {
  editUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});
export default connect(mapStateToProps, { editUser })(EditUser);

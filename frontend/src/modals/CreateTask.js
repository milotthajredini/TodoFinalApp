import { Modal, Button, Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createTask } from "../actions/taskAction";
import { fetchUsers } from "../actions/userAction";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { FETCH_TASKS } from "../actions/types";

function CreateTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [show, setShow] = useState(true);
  let navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  useEffect(() => {
    setTitle(props?.currentTask?.title);
    setDescription(props?.currentTask?.description);
    setAssigned(props?.currentTask?.assigned);
    props?.fetchUsers();
  }, [props?.currentTask, props?.fetchUsers]);

  const submitTask = (e) => {
    e.preventDefault();

    const task = {
      title: title,
      description: description,
      assigned: assigned,
      status: status,
    };

    props.createTask(task);
    navigate("/", { replace: true });
  };

  const userItem = props.users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitTask}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of the Task</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description...."
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example "
              onChange={(event) => setAssigned(event.target.value)}
            >
              <option>Select a User</option>
              {userItem}
            </Form.Select>
            <Form.Group className="mb-3 my-4" controlId="formBasicCheckbox">
              <div className="mb-3">
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      value="TODO"
                      label="TODO"
                      name="todo"
                      checked={status === "TODO"}
                      onChange={(event) => setStatus(event.target.value)}
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      value="IN PROGRESS"
                      label="IN PROGRESS"
                      checked={status === "IN PROGRESS"}
                      name="status"
                      onChange={(event) => setStatus(event.target.value)}
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      value="DONE"
                      label="DONE"
                      checked={status === "DONE"}
                      name="status"
                      onChange={(event) => setStatus(event.target.value)}
                      type={type}
                      id={`inline-${type}-1`}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            <Modal.Footer>
              <Link to="/">
                <Button variant="secondary">Close</Button>
              </Link>
              <Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users.items,
});
export default connect(mapStateToProps, { createTask, fetchUsers })(CreateTask);

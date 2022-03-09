import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editTask } from "../actions/taskAction";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router";

function EditTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  useEffect(() => {
    setTitle(props?.currentTask?.title);
    setDescription(props?.currentTask?.description);
    setStatus(props?.currentTask?.status);
  }, [props?.currentTask]);

  function submitEditedTask(e) {
    e.preventDefault();

    let task = {
      title: title,
      description: description,
      status: status,
    };

    props.editTask(props.currentTask?.id, task);
    navigate("/");
  }

  return (
    <div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={submitEditedTask}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name of the Task</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Description...."
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                />
              </Form.Group>
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
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                </Form.Group>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

EditTask.propTypes = {
  editTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentTask: state.tasks.currentTask,
});
export default connect(mapStateToProps, { editTask })(EditTask);

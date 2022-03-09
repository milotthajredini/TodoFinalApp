import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchTasks, deleteTask, fetchTask } from "../../actions/taskAction";
import { fetchUsers, fetchUser } from "../../actions/userAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../assets/css/taskCard.css";
function TaskCard(props) {
  const [filter, setFilter] = useState("");
  const colors = {
    NORMAL: "primary",
    TODO: "danger",
    INPROGRESS: "warning",
    DONE: "success",
  };
  useEffect(() => {
    props?.fetchTasks();
    props?.fetchUsers();
  }, [props.fetchTasks, props.fetchUsers]);

  const getTaskData = (taskId) => {
    props?.fetchTask(taskId);
  };

  const filterByTask = props.tasks
    .filter((task) => task.status == filter)
    .map((filterTask) => {
      return (
        <div key={filterTask.id}>
          <Card
            border={
              filter == "TODO"
                ? colors.TODO
                : filter == "IN PROGRESS"
                ? colors.INPROGRESS
                : colors.DONE
            }
            style={{ width: "18rem" }}
          >
            <Card.Header>Task</Card.Header>
            <Card.Body>
              <Card.Title>{filterTask.title}</Card.Title>
              <Card.Text>{filterTask.description}</Card.Text>
              <Card.Text>Status: {filterTask.status}</Card.Text>
            </Card.Body>
            <Card.Footer>
              {props.users
                .filter((user) => user.id === filterTask.assigned)
                .map((userAssigned) => (
                  <div>
                    <Card.Text>Assigned to : {userAssigned.name}</Card.Text>
                  </div>
                ))}
              <div className="icons">
                <Link
                  to={`edit/${filterTask.id}`}
                  onClick={() => getTaskData(filterTask.id)}
                >
                  <i className="far fa-edit "></i>
                </Link>
                <i
                  className="far fa-trash-alt trash"
                  onClick={() => {
                    props.deleteTask(filterTask.id);
                  }}
                ></i>
              </div>
            </Card.Footer>
          </Card>
        </div>
      );
    });

  const taskItem = props.tasks.map((task) => {
    if (
      (task.id,
      task.title,
      task.description,
      task.assigned,
      task.status != null)
    ) {
      return (
        <div key={task.id}>
          <Card border="primary" style={{ width: "18rem" }}>
            <Card.Header>Task</Card.Header>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>Status: {task.status}</Card.Text>
            </Card.Body>
            <Card.Footer>
              {props.users
                .filter((user) => user.id === task.assigned)
                .map((userAssigned) => (
                  <div>
                    <Card.Text>Assigned to : {userAssigned.name}</Card.Text>
                  </div>
                ))}
              <div className="icons">
                <Link
                  to={`edit/${task.id}`}
                  onClick={() => getTaskData(task.id)}
                >
                  <i className="far fa-edit "></i>
                </Link>
                <i
                  className="far fa-trash-alt trash"
                  onClick={() => {
                    props.deleteTask(task.id);
                  }}
                ></i>
              </div>
            </Card.Footer>
          </Card>
        </div>
      );
    }
  });

  return (
    <div className="container">
      <div className="">
        <h6>Filter By:</h6>
      </div>
      <div className="selectFilter">
        <Form.Select
          aria-label="Default select example "
          onChange={(event) => setFilter(event.target.value)}
        >
          <option key="1" value="">
            Select a Status
          </option>
          <option key="2" value="TODO">
            TODO
          </option>
          <option key="3" value="IN PROGRESS">
            IN PROGRESS
          </option>
          <option key="4" value="DONE">
            DONE
          </option>
        </Form.Select>
      </div>
      <div className="taskContainer">
        {filter == "" ? taskItem : filterByTask}
      </div>
    </div>
  );
}
TaskCard.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  newTask: PropTypes.object,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.items,
  users: state.users.items,
  user: state.users.item,
  newTask: state.tasks.item,
});

export default connect(mapStateToProps, {
  fetchTasks,
  deleteTask,
  fetchTask,
  fetchUsers,
  fetchUser,
})(TaskCard);

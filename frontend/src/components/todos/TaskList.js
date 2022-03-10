import React from "react";
import TaskCard from "./TaskCard";
import "../../assets/css/TaskList.css";
import { Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

function TaskList(props) {
  return (
    <div className="container">
      <h1 className="textHome">Task List</h1>
      <div className="container">
        <div className="buttons mt-4">
          <Link to="create">
            <Button className="btn buttonklasa">Create Task</Button>
          </Link>
          <Link to="user-list">
            <Button className="btn buttonklasa">Users List</Button>
          </Link>
        </div>
        <TaskCard />
        <Outlet />
        <div className="taskContainer"></div>
      </div>
    </div>
  );
}

export default TaskList;

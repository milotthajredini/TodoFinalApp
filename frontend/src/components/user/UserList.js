import React from "react";
import { Button } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "../../assets/css/UserList.css";
import UserCard from "./UserCard";
function UserList() {
  return (
    <div>
      <h1>User List</h1>
      <div className="container">
        <div className="buttons">
          <Link to="createuser">
            <Button className="primary buttonklasa">Create User</Button>
          </Link>
          <Link to="/">
            <Button className="primary buttonklasa">Task List</Button>
          </Link>
        </div>
        <UserCard />
        <Outlet />
      </div>
    </div>
  );
}

export default UserList;

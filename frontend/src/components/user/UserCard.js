import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers, fetchUser, deleteUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import "../../assets/css/UserCard.css";

function UserCard(props) {
  useEffect(() => {
    props?.fetchUsers();
  }, [props?.fetchUsers]);
  const getUserData = (userId) => {
    props?.fetchUser(userId);
  };
  const userItem = props.users.map((user) => (
    <div key={user.id}>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Header>User</Card.Header>
        <Card.Body>
          <Card.Text>Name: {user.name}</Card.Text>{" "}
          <Card.Text>Email: {user.email}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="icons">
            <Link to={`edit/${user.id}`} onClick={() => getUserData(user.id)}>
              <i className="far fa-edit"></i>
            </Link>
            <i
              className="far fa-trash-alt trash"
              onClick={() => {
                props.deleteUser(user.id);
              }}
            ></i>
          </div>
        </Card.Footer>
      </Card>
    </div>
  ));

  return <div className="userContainer">{userItem}</div>;
}
UserCard.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object,
};
const mapStateToProps = (state) => ({
  users: state.users.items,
  newUser: state.users.item,
});
export default connect(mapStateToProps, { fetchUsers, deleteUser, fetchUser })(
  UserCard
);

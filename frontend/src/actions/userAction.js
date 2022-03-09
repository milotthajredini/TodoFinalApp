import {
  FETCH_USER,
  FETCH_USERS,
  NEW_USER,
  EDIT_USER,
  DELETE_USER,
} from "./types";
import axios from "axios";

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/user-list/");
    dispatch({
      type: FETCH_USERS,
      payload: res.data,
    });
  } catch (e) {
    alert(e);
  }
};
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/user-detail/${userId}`
    );
    console.log("mrena mrena fetch user");
    dispatch({
      type: FETCH_USER,
      payload: res.data,
    });
  } catch (e) {
    alert(e);
  }
};
export const createUser = (userData) => async (dispatch) => {
  try {
    const user = await axios.post(
      "http://127.0.0.1:8000/api/user-create/",
      userData
    );
    dispatch({
      type: NEW_USER,
      payload: user,
    });
  } catch (e) {
    alert(e);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    const task = await axios.delete(
      `http://127.0.0.1:8000/api/user-delete/${id}`
    );
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (e) {
    alert(e);
  }
};
export const editUser = (id, userData) => async (dispatch) => {
  try {
    const user = await axios.post(
      `http://127.0.0.1:8000/api/user-update/${id}`,
      userData
    );
    dispatch({
      type: EDIT_USER,
      payload: user,
    });
  } catch (e) {
    alert(e);
  }
};

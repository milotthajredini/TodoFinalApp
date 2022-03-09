import {
  DELETE_TASK,
  FETCH_TASKS,
  NEW_TASK,
  EDIT_TASK,
  FETCH_TASK,
} from "./types";
import axios from "axios";
export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/task-list/`);

    dispatch({
      type: FETCH_TASKS,
      payload: res.data,
    });
  } catch (e) {
    alert(e);
  }
};

export const fetchTask = (taskId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/task-detail/${taskId}`
    );

    dispatch({
      type: FETCH_TASK,
      payload: res.data,
    });
  } catch (e) {
    alert(e);
  }
};

export const createTask = (taskData) => async (dispatch) => {
  try {
    const task = await axios.post(
      "http://127.0.0.1:8000/api/task-create/",
      taskData
    );
    dispatch({
      type: NEW_TASK,
      payload: task,
    });
  } catch (e) {
    alert(e);
  }
};
export const deleteTask = (id) => async (dispatch) => {
  try {
    const task = await axios.delete(
      `http://127.0.0.1:8000/api/task-delete/${id}`
    );
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (e) {
    alert(e);
  }
};

export const editTask = (id, taskData) => async (dispatch) => {
  try {
    const task = await axios.post(
      `http://127.0.0.1:8000/api/task-update/${id}`,
      taskData
    );
    dispatch({
      type: EDIT_TASK,
      payload: task,
    });
  } catch (e) {
    alert(e);
  }
};

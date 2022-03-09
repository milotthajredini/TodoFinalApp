import {
  DELETE_TASK,
  FETCH_TASKS,
  NEW_TASK,
  EDIT_TASK,
  FETCH_TASK,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  currentTask: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case NEW_TASK:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    case EDIT_TASK:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}

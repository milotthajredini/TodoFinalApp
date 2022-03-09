import {
  FETCH_USER,
  FETCH_USERS,
  NEW_USER,
  EDIT_USER,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case NEW_USER:
      return {
        ...state,
        item: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    case EDIT_USER:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}

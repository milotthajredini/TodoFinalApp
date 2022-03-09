import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import your route components too
import CreateTask from "./modals/CreateTask";
import CreateUser from "./components/user/CreateUser";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import EditTask from "./modals/EditTask";
import EditUser from "./components/user/EditUser";
import UserList from "./components/user/UserList";

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="create" exact element={<CreateTask />}></Route>
          <Route path="edit/:id" element={<EditTask />}></Route>
        </Route>
        <Route path="/user-list" element={<UserList />}>
          <Route path="createuser" exact element={<CreateUser />}></Route>
          <Route path="edit/:id" element={<EditUser />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

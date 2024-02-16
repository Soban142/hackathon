import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import RequireAuth from "./components/RequireAuth";
// import { useSelector } from "react-redux";
import Attendance from "./pages/attendance/Attendance";

function App() {
  // const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/">
            <Route element={<RequireAuth />}>
              <Route index element={<UserList />} />
            </Route>
            <Route path="/user">
              <Route path=":userId" element={<User />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="attendances" element={<Attendance />} />
            </Route>
            <Route path="signin" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

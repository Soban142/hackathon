import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import {
  DeleteOutline,
  PermIdentity,
  AddCircle,
  Edit,
  Visibility,
  ArrowBack,
  CameraAlt,
} from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addStudent, getStudents } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const students = useSelector((state) => state.student.students);
  console.log(students);
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getStudents(dispatch);
  }, [dispatch, students]);

  const handleAdd = async () => {
    addStudent(fields, dispatch);
    setOpen(false);
  };

  function handleFields(e) {
    e.preventDefault();
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  console.log(fields);

  return (
    <div className="userList">
      {open && (
        <div className="modal">
          <div className="modalContainer">
            <div className="modal-header">
              <div className="header-side-1">
                <span
                  onClick={() => setOpen(false)}
                  style={{
                    cursor: "pointer",
                    marginRight: "7px",
                  }}
                >
                  <ArrowBack />
                </span>
                <h3>Add Student</h3>
              </div>
              <button className="addStudent-btn" onClick={handleAdd}>
                Add
              </button>
            </div>
            <div className="imgSelectorContainer">
              <div className="img_selector">
                <img src="" alt="" className="student_img" />
                <span className="img_selector_icon_container">
                  <CameraAlt />
                </span>
              </div>
            </div>
            <div className="fieldContainer">
              <div className="fieldDiv">
                <div>
                  <label htmlFor="">First Name</label>
                  <input type="text" name="firstname" onChange={handleFields} />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <input type="text" name="lastname" onChange={handleFields} />
                </div>
              </div>
              <div className="fieldDiv">
                <div>
                  <label htmlFor="">Course</label>
                  <input type="text" name="course" onChange={handleFields} />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input type="text" name="password" onChange={handleFields} />
                </div>
              </div>
              <div className="fieldDiv">
                <div>
                  <label htmlFor="">Email</label>
                  <input type="text" name="email" onChange={handleFields} />
                </div>
                <div>
                  <label htmlFor="">Phone Number</label>
                  <input type="text" name="number" onChange={handleFields} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <div className="headingContainer">
          <div className="icon-div">
            <PermIdentity color="white" />
          </div>
          <h2 className="heading">Students</h2>
        </div>
        <div className="buttonContainer" onClick={() => setOpen(true)}>
          <button className="addButton">
            <AddCircle />
            <span>Add Student</span>
          </button>
        </div>
      </div>
      <div className="topBar">
        <ul className="list-item-container">
          <li className="list-item">id</li>
          <li className="list-item">Profile Img</li>
          <li className="list-item">Name</li>
          <li className="list-item">Course Name</li>
          <li className="list-item">Password</li>
        </ul>
      </div>
      <div className="users">
        {students?.map((student, index) => (
          <div key={student.id}>
            <ul className="list-item-container">
              <li className="list-item-user list-item">{index + 1}</li>
              <li className="list-item-user list-item">
                <img
                  src={
                    student.img !== ""
                      ? student.img
                      : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                  }
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </li>
              <li className="list-item-user list-item">{student.firstname}</li>
              <li className="list-item-user list-item">{student.course}</li>
              <li className="list-item-user list-item">{student.password}</li>
              <li
                className="list-item-user list-item"
                onClick={() => navigate(`/user/${student.id}`)}
                style={{
                  cursor: "pointer",
                }}
              >
                <Edit />
              </li>
              <li className="list-item-user list-item">
                <Visibility />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

import "./userList.css";
import {
  PermIdentity,
  AddCircle,
  Edit,
  Visibility,
  ArrowBack,
  CameraAlt,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { addStudent, getStudents } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const [students, setStudents] = useState();
  const studentsFromRedux = useSelector((state) => state.student);
  const navigate = useNavigate();
  useEffect(() => {
    if (studentsFromRedux.error === "Token is invalid!") {
      navigate("/signin");
      // <Navigate to="/signin" state={{ from: window.location }} replace />;
    } else {
      setStudents(studentsFromRedux.students);
    }
  }, [students]);

  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    getStudents(dispatch);
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const [key, value] of Object.entries(fields)) {
      form.append(key, value);
    }
    addStudent(form, dispatch);
    setOpen(false);
  };

  function handleFields(e) {
    e.preventDefault();

    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    }));
  }
  return (
    <div className="userList">
      {open && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <form
              className="modalContainer"
              encType="multipart/form-data"
              onSubmit={handleAdd}
            >
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
                <button className="addStudent-btn" type="submit">
                  Add
                </button>
              </div>
              <div className="imgSelectorContainer">
                <div className="img_selector">
                  <img
                    src={`${
                      fields.userimg && URL.createObjectURL(fields?.userimg)
                    }`}
                    alt=""
                    className="student_img"
                  />
                  <label className="img_selector_icon_container" htmlFor="img">
                    <CameraAlt />
                    <input
                      type="file"
                      id="img"
                      name="userimg"
                      onChange={handleFields}
                      style={{
                        display: "none",
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="fieldContainer">
                <div className="fieldDiv">
                  <div>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleFields}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      onChange={handleFields}
                    />
                  </div>
                </div>
                <div className="fieldDiv">
                  <div>
                    <label htmlFor="">Course</label>
                    <input type="text" name="course" onChange={handleFields} />
                  </div>
                  <div>
                    <label htmlFor="">Password</label>
                    <input
                      type="text"
                      name="password"
                      onChange={handleFields}
                    />
                  </div>
                </div>
                <div className="fieldDiv">
                  <div>
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" onChange={handleFields} />
                  </div>
                  <div>
                    <label htmlFor="">Phone Number</label>
                    <input type="text" name="contact" onChange={handleFields} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      <div className="header">
        <div className="headingContainer">
          <div className="icon-div">
            <PermIdentity
              style={{
                color: "white",
              }}
            />
          </div>
          <h2 className="heading">Students</h2>
        </div>
        <div className="buttonContainer" onClick={() => setOpen(true)}>
          <button className="addButton">
            <AddCircle
              style={{
                color: "white",
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "1rem",
              }}
            >
              Add Student
            </span>
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
          <div
            key={student._id}
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              padding: "10px 0",
              borderRadius: "10px",
            }}
          >
            <ul className="list-item-container">
              <li className="list-item-user">{student.rollNum}</li>
              <li className="list-item-user">
                <img
                  src={
                    student.img
                      ? student.img
                      : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                  }
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                  }}
                  alt="User's"
                />
              </li>
              <li className="list-item-user">{student.firstname}</li>
              <li className="list-item-user">{student.course}</li>
              <li className="list-item-user">{student.password}</li>
              <li
                className="list-item-user"
                onClick={() => navigate(`/user/${student._id}`)}
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

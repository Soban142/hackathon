import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Computer,
} from "@material-ui/icons";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../redux/apiCalls";

export default function User() {
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();

  const [selectedStudent, setSelectedStudent] = useState({});
  const [fields, setFields] = useState({});

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const student = students.filter((student) => {
      return student._id === userId;
    });
    setFields(student[0]);
    setSelectedStudent(student);
  }, [userId]);
  console.log(selectedStudent);

  const handleFields = (e) => {
    e.preventDefault();

    setFields((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
      };
    });
  };
  console.log(fields);

  const handleEdit = (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const [key, value] of Object.entries(fields)) {
      form.append(key, value);
    }
    updateStudent(userId, form, dispatch);
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={fields?.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {selectedStudent[0]?.username}
              </span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {selectedStudent[0]?.firstname +
                  " " +
                  selectedStudent[0]?.lastname}
              </span>
            </div>
            <div className="userShowInfo">
              <Computer className="userShowIcon" />
              <span className="userShowInfoTitle">
                {selectedStudent[0]?.course}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {selectedStudent[0]?.contact}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                {selectedStudent[0]?.email}
              </span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {selectedStudent[0]?.address || "New York | USA"}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" encType="multipart/form-data">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={fields?.username}
                  placeholder={fields?.username}
                  className="userUpdateInput"
                  onChange={(e) => {
                    handleFields(e);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={fields?.email}
                  placeholder={fields?.email}
                  className="userUpdateInput"
                  onChange={(e) => {
                    handleFields(e);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="contact"
                  value={fields?.contact}
                  placeholder={fields?.contact}
                  className="userUpdateInput"
                  onChange={(e) => {
                    handleFields(e);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  value={fields?.address}
                  name="address"
                  placeholder="User address"
                  className="userUpdateInput"
                  onChange={handleFields}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    fields?.userimg
                      ? URL.createObjectURL(fields?.userimg)
                      : fields?.img
                  }
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="userimg"
                  style={{ display: "none" }}
                  onChange={handleFields}
                />
              </div>
              <button
                className="userUpdateButton"
                type="submit"
                onClick={handleEdit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

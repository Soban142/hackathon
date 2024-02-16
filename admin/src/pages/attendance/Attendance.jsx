import "./attendance.css";
import { PermIdentity } from "@material-ui/icons";
import { useEffect } from "react";
import { getAttendance } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import AttendanceRow from "../../components/attendanceRow/AttendanceRow";

export default function Attendance() {
  const attendances = useSelector((state) => state.attendance.attendances);
  const dispatch = useDispatch();
  useEffect(() => {
    getAttendance(dispatch);
  }, [dispatch]);

  return (
    <div className="userList">
      <div className="header">
        <div className="headingContainer">
          <div
            className="icon-div"
            style={{
              color: "white",
            }}
          >
            <PermIdentity color="inherit" />
          </div>
          <h2 className="heading">Attendances</h2>
        </div>
      </div>
      <div className="topBar">
        <ul className="list-item-attendance-container">
          <li className="list-item">id</li>
          <li className="list-item">Profile Img</li>
          <li className="list-item">Name</li>
          <li className="list-item">Checked In Time</li>
          <li className="list-item">Checked Out Time</li>
        </ul>
      </div>
      <div className="attendances">
        {attendances?.map((attendance) => (
          <AttendanceRow attendance={attendance} key={attendance._id} />
        ))}
      </div>
    </div>
  );
}

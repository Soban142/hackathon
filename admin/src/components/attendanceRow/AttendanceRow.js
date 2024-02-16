import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
// import { format } from "date-fns";
// const { format } = require("date-fns");
// import { format } from "timeago.js";
import dateFormat from "dateformat";

const AttendanceRow = ({ attendance }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const attendee = await userRequest.get(
        `/students/find/${attendance?.userId}`
      );
      console.log(attendee.data);
      setUser(attendee.data);
    };
    getUser();
  }, [attendance?.userId]);

  return (
    <div
      key={attendance.id}
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "1rem 0",
        marginBottom: "10px",
      }}
    >
      <ul className="list-item-attendance-container">
        <li className="list-item-attendance">{user.rollNum}</li>
        <li className="list-item-attendance">
          <img
            src={
              user?.img !== ""
                ? user.img
                : "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
            }
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              objectFit: "cover",
            }}
            alt="User"
          />
        </li>
        <li className="list-item-attendance">{user?.firstname}</li>
        <li className="list-item-attendance">
          {dateFormat(attendance?.checkIn?.time, "h:MM TT dS mmm, yyyy")}
        </li>
        <li className="list-item-attendance">
          {/* {attendance?.checkOut?.time} */}
          {dateFormat(attendance?.checkOut?.time, "h:MM TT dS mmm, yyyy")}
        </li>
      </ul>
    </div>
  );
};

export default AttendanceRow;

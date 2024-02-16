import "./sidebar.css";
import { LineStyle, Timeline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [location, setLocation] = useState("");
  const pathname = useLocation().pathname;
  useEffect(() => {
    setLocation(pathname);
  }, [pathname]);

  return (
    <div
      className="sidebar"
      style={{
        display: location === "/signin" ? "none" : "block",
      }}
    >
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Students
              </li>
            </Link>
            <Link to="/attendances" className="link">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Attendance
              </li>
            </Link>
            <Link to="/signin" className="logout_link">
              <li className="sidebarListItem">
                <img
                  src="/logout.svg"
                  className="sidebarIcon logout_icon"
                  alt="Logout"
                />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

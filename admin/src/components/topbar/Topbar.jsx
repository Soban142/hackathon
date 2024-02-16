import React, { useEffect, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const [location, setLocation] = useState("");
  const pathname = useLocation().pathname;
  useEffect(() => {
    setLocation(pathname);
  }, [pathname]);

  return (
    <div
      className="topbar"
      style={{
        display: location === "/signin" ? "none" : "block",
      }}
    >
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

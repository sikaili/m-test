import "../scss/Badge.scss";

import React from "react";
import { useSelector } from "react-redux";

import { selectUnreadMessageNumber } from "../features/realtorSlice";

function Badge() {
  const unreadMessageNumber = useSelector(selectUnreadMessageNumber);
  return (
    <div className={`Badge ${unreadMessageNumber ? "Badge--active" : ""}`}>
      <i className="mypro-icon mypro-icon-email" />
      {" "}
      {unreadMessageNumber}
    </div>
  );
}

export default Badge;

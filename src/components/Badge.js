import React from "react";
import { useSelector } from "react-redux";

import { selectUnreadMessageNumber } from "../features/realtorSlice";

function Badge() {
  const unreadMessageNumber = useSelector(selectUnreadMessageNumber);
  return (
    <div className="badge">
      /Badge/
      {" "}
      {unreadMessageNumber}
    </div>
  );
}

export default Badge;

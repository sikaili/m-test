import "../scss/MessageList.scss";

import React from "react";

import MessageListItem from "./MessageListItem";

export default function MessageList() {
  return (
    <ul className="MessageList">
      <li>
        <MessageListItem />
      </li>
    </ul>
  );
}

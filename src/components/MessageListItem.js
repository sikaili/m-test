import "../scss/MessageListItem.scss";

import propTypes from "prop-types";
import React from "react";

export default function MessageListItem({
  sender, subject, description, icon, time, read,
}) {
  return (
    <div className="MessageListItem">
      <h3 className="MessageListItem__sender">{sender}</h3>
      <h4>{subject}</h4>
      <span className="MessageListItem__description">{description}</span>
      <i className={`MessageListItem__icon mypro-icon mypro-icon-${icon} ${read ? "MessageListItem__icon--active" : ""}`} />
      <time className={`MessageListItem__time ${read ? "MessageListItem__time--active" : ""}`} dateTime={time}>{time}</time>
    </div>
  );
}

MessageListItem.propTypes = {
  sender: propTypes.string,
  subject: propTypes.string,
  description: propTypes.string,
  icon: propTypes.string,
  time: propTypes.string,
  read: propTypes.bool,
};
MessageListItem.defaultProps = {
  sender: "",
  subject: "",
  description: "",
  icon: "",
  time: "",
  read: false,
};

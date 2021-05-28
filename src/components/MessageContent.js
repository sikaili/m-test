import "../scss/MessageContent.scss";

import propTypes from "prop-types";
import React from "react";

function MessageContent({ body, date, sender }) {
  const {
    firstname: firstName, lastname: lastName,
  } = sender;
  return (
    <div className="MessageContent">
      <h3>{`${firstName} ${lastName}`}</h3>
      <h4>{new Date(date).toLocaleString()}</h4>
      <p>{body}</p>
    </div>
  );
}

export default MessageContent;

MessageContent.propTypes = {
  sender: propTypes.object,
  body: propTypes.node,
  date: propTypes.string,
};
MessageContent.defaultProps = {
  sender: {},
  body: "",
  date: "",
};

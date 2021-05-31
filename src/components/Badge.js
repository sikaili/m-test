import "../scss/Badge.scss";

import propTypes from "prop-types";
import React from "react";

function Badge({ number, type }) {
  return (
    <div className={`Badge ${number ? "Badge--active" : ""}`}>
      <i className={`mypro-icon mypro-icon-${type}`} />
      {" "}
      {number}
    </div>
  );
}

export default Badge;

Badge.propTypes = {
  number: propTypes.number,
  type: propTypes.string,
};
Badge.defaultProps = {
  number: 0,
  type: "email",
};

import "../scss/Error.scss";

import propTypes from "prop-types";
import React from "react";

function Error({ message }) {
  return (
    <div className="Error">
      {message}
      {" "}
      <button type="button" onClick={() => window.location.reload()}>Click to refresh</button>
    </div>
  );
}

export default Error;

Error.propTypes = {
  message: propTypes.string,
};
Error.defaultProps = {
  message: "There is a problem with your server",
};

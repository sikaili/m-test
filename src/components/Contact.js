import "../scss/Contact.scss";

import propTypes from "prop-types";
import React from "react";

function Contact({ contact }) {
  const {
    firstname: firstName, lastname: lastName, email, phone,
  } = contact;
  return (
    <div className="Contact">
      <h3>
        {firstName}
        {" "}
        {lastName}
      </h3>
      <h4>
        Email
        {" "}
        <span>
          {email}
        </span>
      </h4>
      <h4>
        Téléphone
        {" "}
        <span>
          {phone}
        </span>

      </h4>
    </div>
  );
}

export default Contact;

Contact.propTypes = {
  contact: propTypes.object,
};
Contact.defaultProps = {
  contact: {},
};

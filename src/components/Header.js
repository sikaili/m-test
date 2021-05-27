import "../scss/Header.scss";

import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/icons/logo-meilleursagentspro-neg.svg";
import Badge from "./Badge";
import RealtorsMenu from "./RealtorsMenu";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <Badge />
      <RealtorsMenu />
    </div>
  );
}

export default Header;

import "../scss/Header.scss";

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/icons/logo-meilleursagentspro-neg.svg";
import { selectUnreadMessageNumber } from "../store/features/realtorSlice";
import Badge from "./Badge";
import RealtorsMenu from "./RealtorsMenu";

function Header() {
  const unreadMessageNumber = useSelector(selectUnreadMessageNumber);

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <Badge number={+unreadMessageNumber} type="email" />
      <RealtorsMenu />
    </div>
  );
}

export default Header;

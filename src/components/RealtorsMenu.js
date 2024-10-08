import "../scss/RealtorsMenu.scss";

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

import { useOnClickOutside } from "../js/hooks/useOnClickOutside";
import { selectCurrentRealtor, selectRealtors, setCurrentRealtor } from "../store/features/realtorSlice";

function RealtorsMenu() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 720px)",
  });
  const ref = useRef({});
  const realtors = useSelector(selectRealtors);
  const dispatch = useDispatch();
  const currentRealtor = useSelector(selectCurrentRealtor);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const handleClickListItem = (realtor) => {
    dispatch(setCurrentRealtor(realtor));
    setShowMenu(false);
    history.push(`/realtor/${realtor.id}`);
  };
  useOnClickOutside(ref, () => { setShowMenu(false); });
  return (
    <div className="RealtorMenu" ref={ref}>
      <button className="RealtorMenu__avatar" onClick={() => setShowMenu(!showMenu)} type="button">
        <img src={currentRealtor && currentRealtor.logo} alt="current-realtor-avatar" />
        {isDesktop && <h3>{currentRealtor && currentRealtor.name}</h3>}
        <i className={`RealtorMenu__arrow mypro-icon mypro-icon-arrow-${showMenu ? "up" : "down"}`} />
      </button>
      {(realtors && realtors.length > 1) && (
      <menu
        className="RealtorMenu__dropdown"
        style={{ display: showMenu ? "" : "none" }}
      >
        {realtors.map((realtor) => (
          <li key={realtor.id}>
            <button
              className={`RealtorMenu__avatar ${realtor.id === currentRealtor.id ? "RealtorMenu__avatar--current" : ""}`}
              onClick={() => { handleClickListItem(realtor); }}
              type="button"
            >
              <img src={realtor.logo} alt="realtor-avatar" />
              <h3>{realtor.name}</h3>
            </button>
          </li>
        ))}
      </menu>
      )}

    </div>
  );
}

export default RealtorsMenu;

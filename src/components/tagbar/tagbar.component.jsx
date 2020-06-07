import React from "react";
import { NavLink } from "react-router-dom";

import "./tagbar.styles.scss";

const activeStyle = {
  borderBottom: "2px solid rgb(233, 197, 79)",
  color: "rgb(233, 197, 79)",
};
const TagBar = () => {
  return (
    <nav className="tag-bar">
      <ul className="tags-ul">
        <NavLink to="/t/landscape" className="tags" activeStyle={activeStyle}>
          <li>Landscape</li>
        </NavLink>
        <NavLink to="/t/wallpaper" className="tags" activeStyle={activeStyle}>
          <li>Wallpaper</li>
        </NavLink>
        <NavLink to="/t/portrait" className="tags" activeStyle={activeStyle}>
          <li>Portrait</li>
        </NavLink>
        <NavLink to="/t/nature" className="tags" activeStyle={activeStyle}>
          <li>Nature</li>
        </NavLink>
        <NavLink to="/t/streets" className="tags" activeStyle={activeStyle}>
          <li>Streets</li>
        </NavLink>
        <NavLink to="/t/people" className="tags" activeStyle={activeStyle}>
          <li>People</li>
        </NavLink>
        <NavLink to="/t/travel" className="tags" activeStyle={activeStyle}>
          <li>Travel</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default TagBar;

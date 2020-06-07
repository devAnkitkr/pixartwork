import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import SearchField from "../search-field/search-field.component";
import accountPng from "../../assets/account.png";

import "./navbar.styles.scss";

const activeStyle = {
  color: "rgb(233, 197, 79) !important",
};

const Navbar = ({ currentUser }) => {
  const [profilePic, setProfile] = useState(accountPng);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.profilePic !== "") {
        setProfile(currentUser.profilePic);
      }
    }
  }, [currentUser]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <h4 className="navbar-brand text-primary m-0">
        <a href="/" className='small-logo'>Pixartwork</a>
      </h4>
      <SearchField />
      <button
        className="navbar-toggler m-0 p-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{order:'3'}}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <NavLink to="/" className="tags" activeStyle={activeStyle}>
            <li className="nav-item active">
              <span className="nav-link">
                Home <span className="sr-only">(current)</span>
              </span>
            </li>
          </NavLink>
          {currentUser && (
            <NavLink
              to={`/profile/${currentUser.uid}`}
              className="tags"
              activeStyle={activeStyle}
            >
              <li className="nav-item active">
                <span className="nav-link">Profile</span>
              </li>
            </NavLink>
          )}
          <NavLink to="/submitphoto" className="tags" activeStyle={activeStyle}>
            <li className="nav-item active">
              <span className="nav-link">Submit photo</span>
            </li>
          </NavLink>
          {currentUser ? (
            <li className="nav-item">
              <span
                className="nav-link"
                onClick={() => {
                  auth.signOut();
                  window.location.reload();
                }}
                style={{ cursor: "pointer" }}
              >
                Sign out
              </span>
            </li>
          ) : (
            <>
              <NavLink to="/login" className="tags" activeStyle={activeStyle}>
                <li className="nav-item">
                  <span className="nav-link">Login</span>
                </li>
              </NavLink>
              <NavLink to="/join" className="tags" activeStyle={activeStyle}>
                <li className="nav-item">
                  <span className="nav-link">Join</span>
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <div className="user-status m-0">
        <li>
          <NavLink to="/account" className="tags" activeStyle={activeStyle}>
            <img
              src={profilePic}
              alt="profilepicture"
              className="rounded-circle profile-image m-0 p-0"
            />
          </NavLink>
        </li>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Navbar);

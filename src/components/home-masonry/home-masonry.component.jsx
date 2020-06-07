import React from "react";
import { NavLink } from "react-router-dom";
import accountPng from "../../assets/account.png";

import "./home-masonry.styles.scss";

const HomeMasonry = ({ featuredImages, handleClick }) => {
  return (
    <main className ='home-masonry'>
      <div className="card-columns">
        {featuredImages.map((img, id) => (
          <div
            className="card border-0"
            key={id}
            style={{ position: "relative" }}
          >
            <img
              src={img.thumbURL ? img.thumbURL : img.imgUrl}
              className="card-img-top"
              alt="..."
            />
            <div className="frame-body" onClick={handleClick} id={id}>
              <span className="frame-title ml-3">{img.title}</span>
              <div className="frame-user">
                <NavLink
                  to={`/profile/${img.profileUrl}`}
                  className="profileUrl"
                >
                  <img
                    src={`${
                      img.profilePic === "" ? accountPng : img.profilePic
                    }`}
                    className="profile-pic rounded-circle m-2"
                    width="30"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                    alt="profile-pic"
                  />
                  <div>{img.name}</div>
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeMasonry;

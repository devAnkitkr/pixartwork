import React from "react";
import accountPng from "../../../../assets/account.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import "./lightbox-homepage.scss";

const buttonStyle = {
  color: "black",
  position: "absolute",
  right: "10px",
  bottom: "10px",
};

const Lightbox = ({ featuredImages, index, closeLightbox }) => {
  return (
    <div className="lightbox" id="lightbox" onClick={closeLightbox}>
      {featuredImages.map(
        (img, id) =>
          id === Number(index) && (
            <span className="lb-container" key={id / 1000}>
              <a
                href={img.imgUrl}
                class="btn btn-success"
                style={buttonStyle}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <FontAwesomeIcon icon={faDownload} />
              </a>
              <span className="lb-profile">
                <img
                  src={`${img.profilePic === "" ? accountPng : img.profilePic}`}
                  alt="profile pic"
                  className="profile-pic rounded-circle m-2"
                  width="30"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                  }}
                />
                {img.name}
              </span>
              <img
                src={img.imgUrl}
                className="lb-image"
                width="auto"
                id="lb-image"
                alt="..."
              />
            </span>
          )
      )}
    </div>
  );
};

export default Lightbox;

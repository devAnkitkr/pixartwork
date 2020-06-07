import React, { useState, useEffect } from "react";
import accountPng from "../../assets/account.png";

import "./profile-card.styles.scss";

const ProfileCard = ({ profileDetail }) => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    profilePic: accountPng,
    bio: "",
  });

  useEffect(() => {
    if (profileDetail) {
      if (profileDetail.profilePic !== "")
        setUserProfile({
          name: profileDetail.name,
          email: profileDetail.email,
          profilePic: profileDetail.profilePic,
          bio: profileDetail.bio,
        });
      else
        setUserProfile({
          name: profileDetail.name,
          email: profileDetail.email,
          profilePic: accountPng,
          bio: profileDetail.bio,
        });
    }
  }, [profileDetail]);
  console.log("profileDetail", profileDetail);
  return (
    <div className="profile-card">
      <div className="profile-pic">
        <img src={userProfile.profilePic} alt="profile-pic" />
      </div>
      <div className="profile-detail">
        <h2 className='p-0 m-0 mt-2'>{userProfile.name}</h2>
        <small>{userProfile.email}</small>
        <br></br>
        <p>{userProfile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

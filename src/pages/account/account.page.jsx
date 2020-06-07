import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import accountPng from "../../assets/account.png";
import addButton from "../../assets/addbutton.svg";
import { uploadProfilePicture } from "../../firebase/firebase";
import CustomButton from '../../components/custom-button/custom-button.component'

import "./account.page.scss";

import CloseButton from "../../components/close-button/close-button.component";
import fileValidation from "../submit-photo/components/image-validation";
import EditProfileForm from "../../components/edit-profile-form/edit-profile-form.component";

const AccountPage = ({ currentUser }) => {
  const [profilePic, setProfile] = useState(accountPng);
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.profilePic !== "") {
        setProfile(currentUser.profilePic);
      }
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { files } = event.target;
    const { uid } = currentUser;
    console.log(files[0]);
    if (fileValidation(files[0])) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = async () => {
        const status = await uploadProfilePicture(
          reader.result,
          files[0].name,
          uid
        );
        if (status === "success")
          alert("successfully uploaded your profile picture");
        window.location.reload();
      };
    }
  };
  const handleClick=()=>{
    setEditProfile(!editProfile)
  }
  return (
    <div className="account-page">
      <div className="card bg-dark">
        <div className="card-img-container">
          <CloseButton />
          <img
            className="card-img-top"
            src={profilePic}
            style={{ width: "320px", height: "320px", objectFit: "cover" }}
            alt="Cardcap"
          />
          <label className="custom-file-upload">
            <input type="file" onChange={handleChange} />
            <img src={addButton} width="25" alt="addbutton" />
          </label>
        </div>
        <div className="card-body">
          <h5 className="card-title">{currentUser.name}</h5>
          <p className="card-text">
            <small className="text-muted">{currentUser.email}</small>
          </p>
          <CustomButton handleClick={handleClick} label='Edit profile' />
          {editProfile && <EditProfileForm />}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(AccountPage);

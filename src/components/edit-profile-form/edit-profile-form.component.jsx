import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { connect } from "react-redux";
import DialogBox from "../dialog-box/dialog-box.component";
import { setDialogMsg } from "../../redux/dialog-msg/dialog-msg.action";

import "./edit-profile-form.styles.scss";

const EditProfileForm = ({ currentUser, setDialogMsg }) => {
  const [user, setUser] = useState({
    name: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    db.doc(`users/${currentUser.uid}`)
      .update({
        name: user.name,
        bio: user.bio,
      })
      .then(() => setDialogMsg("profile has been updated"))
      .catch((err) => setDialogMsg(err));
  };
  return (
    <div className="edit-profile-form">
      <DialogBox />
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="name"
          name="name"
          placeholder={currentUser.name}
          onChange={handleChange}
        />
        {/* <label>Email</label>
        <input type="email" name="email"  placeholder={currentUser.email}  onChange={handleChange} /> */}
        <label>Bio</label>
        <textarea
          type="text"
          name="bio"
          placeholder="max letter 300"
          onChange={handleChange}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setDialogMsg: (msg) => dispatch(setDialogMsg(msg)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);

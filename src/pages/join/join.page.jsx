import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, createUserProfileDoc } from "../../firebase/firebase";

import FormInput from "../../components/custom-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import CloseButton from "../../components/close-button/close-button.component";
import DialogBox from "../../components/dialog-box/dialog-box.component";
import { setDialogMsg } from "../../redux/dialog-msg/dialog-msg.action";

import "./join.page.scss";

const JoinPage = ({ history, setDialogMsg }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = user;
    if (password !== confirmPassword) {
      setDialogMsg('password not matching');
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((snapshot) => {
        const { name } = user;
        const { uid, email } = snapshot.user;
        createUserProfileDoc(uid, email, name);
        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        history.push("/");
      })
      .catch((error) => {
        setDialogMsg(error.message);
      });
  };
  return (
    <div className="join-page">
      <DialogBox />
      <div
        className="row bg-light text-dark"
        style={{ minWidth: "50%", minheight: "80vh" }}
      >
        <div className="col-sm bg-dark p-4 section-one">
          <h1 className="join-hero-title p-4">Join the pixart community</h1>
          <p className="join-hero-caption p-4">
            Explore and discover photos, become a better photographer, connect
            with others over mutual hobbies, you can do it all here.
          </p>
        </div>
        <div className="col-sm p-4 section-two">
          <span className="px-4">
            <h2>Join Pixart</h2>
          </span>
          <small className="px-4">
            Already a user? <Link to="/login">LOG IN</Link>
          </small>
          <form className="form-element p-4" onSubmit={handleJoinSubmit}>
            <FormInput
              type="name"
              name="name"
              label="Name"
              handleChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              label="Email"
              handleChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              handleChange={handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              handleChange={handleChange}
            />
            <CustomButton label="JOIN" handleSubmit={handleJoinSubmit} />
          </form>
        </div>
      </div>
      <CloseButton />
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setDialogMsg: (msg) => dispatch(setDialogMsg(msg)),
});

export default connect(null, mapDispatchToProps)(withRouter(JoinPage));

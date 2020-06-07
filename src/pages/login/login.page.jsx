import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import FormInput from "../../components/custom-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import CloseButton from "../../components/close-button/close-button.component";
import DialogBox from "../../components/dialog-box/dialog-box.component";
import { setDialogMsg } from "../../redux/dialog-msg/dialog-msg.action";

import "./login.page.scss";

const LoginPage = ({ history, setDialogMsg }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setUser({
          email: "",
          password: "",
        });
        history.push("/");
      })
      .catch((error) => {
        setDialogMsg(error.message);
      });
  };
  return (
    <div className="login-page">
      <DialogBox />
      <div
        className="row bg-light text-dark"
        style={{ minWidth: "50%", minheight: "80vh" }}
      >
        <div className="col-sm bg-dark p-4 section-one">
          <h1 className="join-hero-title p-4">Welcome to pixart community</h1>
          <p className="join-hero-caption p-4">
            Explore and discover photos, become a better photographer, connect
            with others over mutual hobbies, you can do it all here.
          </p>
        </div>
        <div className="col-sm p-4 section-two">
          <span className="px-4">
            <h2>Welcome back</h2>
          </span>
          <small className="px-4">
            Not a user? <Link to="/join">JOIN</Link>
          </small>
          <form className="form-element p-4" onSubmit={handleLoginSubmit}>
            <FormInput
              type="email"
              name="email"
              label="Email"
              handleChange={handleChanges}
            />
            <FormInput
              type="password"
              name="password"
              label="Password"
              handleChange={handleChanges}
            />
            <CustomButton label="LOG IN" />
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

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { connect } from "react-redux";
import RemoveButton from "../remove-button/remove-button.component";
import { setDialogMsg } from "../../redux/dialog-msg/dialog-msg.action";
import DialogBox from "../dialog-box/dialog-box.component";

import "./user-masonry.styles.scss";
import { useEffect } from "react";

const UserMasonry = ({
  currentUser,
  userData,
  profileDetail,
  handleClick,
  msg,
  setDialogMsg,
  history,
}) => {
  console.log("userData", currentUser);
  const [delWarning, setDelWarning] = useState(false);
  useEffect(() => {}, [setDialogMsg]);

  const handleRemove = (imgURL, thumbURL) => {
    let userRef = db.doc("users/" + currentUser.uid);
    userRef.get().then((snapshot) => {
      let doc = snapshot.data();
      return userRef
        .update({
          ImageStock: doc.ImageStock.filter((img) => img.imgUrl !== imgURL),
        })
        .then(() => {
          let image = storage.refFromURL(imgURL);
          if (thumbURL !== undefined) {
            let thumbnail = storage.refFromURL(thumbURL);
            thumbnail.delete();
          }
          image.delete().then(() => console.log("deleted!"));
          setDialogMsg("deleted!");
          setInterval(() => history.go(), 3000);
        })
        .catch((err) => setDialogMsg(err));
    });
  };
  return (
    <main className="user-masonry">
      <div className="card-columns">
        <DialogBox />
        {userData.map((img, id) => (
          <div
            className="card border-0"
            style={{ position: "relative" }}
            key={id + 11110}
          >
            <img
              src={img.thumbURL.width !== 0 ? img.thumbURL : img.imgUrl}
              className="card-img-top"
              alt="user collection"
              width="50"
            />
            <div className="frame-body" onClick={handleClick} id={id}>
              <span className="frame-title m-1">{img.title}</span>
              <div className="frame-user">
                <div className="tags-container">
                  <ul className="ul-tags">
                    {img.tags &&
                      img.tags.map((tag, id) => (
                        <li className="li-tag mr-2" key={id + 2220}>
                          {tag}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              {currentUser && currentUser.uid === profileDetail.uid && (
                <RemoveButton handleRemove={() => setDelWarning(true)} />
              )}
              {delWarning && (
                <div className="frame-body d-flex flex-column justify-content-center align-items-center">
                  <p>Are you sure you want to delete this image?</p>
                  <button
                    className="custom-button"
                    onClick={() => handleRemove(img.imgUrl, img.ThumbURL)}
                  >
                    Yes
                  </button>
                  <button
                    className="custom-button"
                    onClick={() => setDelWarning(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  msg: state.dialogMsg.msg,
});
const mapDispatchToProps = (dispatch) => ({
  setDialogMsg: (msg) => dispatch(setDialogMsg(msg)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserMasonry));

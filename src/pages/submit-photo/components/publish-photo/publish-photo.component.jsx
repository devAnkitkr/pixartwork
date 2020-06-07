import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setDialogMsg } from "../../../../redux/dialog-msg/dialog-msg.action";
import { connect } from "react-redux";

import "./publish-photo.styles.scss";

const PublishPhoto = ({ currentUser, publishEnd, setDialogMsg }) => {
  useEffect(() => {
    if (publishEnd) {
      setDialogMsg("Hurray! Images have been uploaded");
    }
  }, [publishEnd,setDialogMsg]);
  return (
    <div className="publish-photo">
      {!publishEnd ? (
        <div className="publish-loading">
          <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="publish-finish">
          <div className="success-line">Successfully uploaded checkout</div>
          <Link to={`profile/${currentUser.uid}`}>
            <button className="big-button">Collection</button>
          </Link>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setDialogMsg: (msg) => dispatch(setDialogMsg(msg)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PublishPhoto);

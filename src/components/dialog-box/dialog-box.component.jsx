import React from "react";
import { connect } from "react-redux";
import { resetDialogMsg } from "../../redux/dialog-msg/dialog-msg.action";

import "./dialog-box.styles.scss";

const DialogBox = ({ msg, resetDialogMsg }) => {
  return (
    <div
      className={`${msg != null ? "visible-db" : "invisible-db"}`}
      onClick={(e) => e.target.className === "visible-db" && resetDialogMsg()}
    >
      <div className="db-container">
        <button onClick={() => resetDialogMsg()}>&times;</button>
        <div>{msg}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  msg: state.dialogMsg.msg,
});
const mapDispatchToProps = (dispatch) => ({
  resetDialogMsg: () => dispatch(resetDialogMsg()),
});
export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);

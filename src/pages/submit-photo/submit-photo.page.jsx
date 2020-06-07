import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uploadImagesToStorage } from "../../firebase/firebase";
import OnClickButton from "../../components/onclick-button/onclick-button.component";
import CloseButton from "../../components/close-button/close-button.component";
import DropBox from "./components/drop-box/drop-box.component";
import PublishPhoto from "./components/publish-photo/publish-photo.component";

import "./submit-photo.page.scss";

const SubmitPhotoPage = ({ currentUser, history, imageDoc }) => {
  const [publishBegin, setPublishBegin] = useState(false);
  const [publishEnd, setPublishEnd] = useState(false);

  const handlePublish = () => {
    setPublishBegin(true);
    uploadImagesToStorage(imageDoc, currentUser.uid)
      .then((response) => {
        if (response === "success") {
          setInterval(() => setPublishEnd(true), 5000);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <main className="submit-photo-page">
      <div className="submit-container">
        <CloseButton />
        <div className="submit-header">
          <h3>Submit to Pixart</h3>
        </div>
        {!publishBegin ? <DropBox /> : <PublishPhoto publishEnd={publishEnd} />}
        <div className="submit-footer">
          <OnClickButton
            label="Cancel"
            handleSubmit={() => history.push("/")}
          />
          {imageDoc.length !== 0 && (
            <OnClickButton label="Publish" handleSubmit={handlePublish} />
          )}
        </div>
      </div>
    </main>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  imageDoc: state.imageDoc.imageDoc,
});

export default connect(mapStateToProps)(withRouter(SubmitPhotoPage));

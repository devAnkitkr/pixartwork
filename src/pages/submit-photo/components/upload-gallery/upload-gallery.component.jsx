import React from "react";
import { connect } from "react-redux";
import TagsInput from "../../../../components/tags-input/tags-input.component";
import {
  addImageTitle,
  removeImage,
} from "../../../../redux/image-doc/image-doc-action";
import RemoveButton from "../../../../components/remove-button/remove-button.component";

import "./upload-gallery.styles.scss";

const UploadGallery = ({ src, id, addImageTitle, removeImage }) => {
  return (
    <div className="card border-0 rounded m-3">
      <RemoveButton handleRemove={(e) => removeImage(id)} />
      <img
        src={src}
        width="100"
        alt="upload-content"
        className="card-img-top"
        style={{ width: "260px", height: "250px", objectFit: "cover" }}
      />
      <div className="body-card">
        <input
          className="input-title"
          type="text"
          placeholder="Add Title"
          name="title"
          onChange={(e) => addImageTitle(id, e.target.value)}
        />
        <TagsInput id={id} />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addImageTitle: (id, title) => dispatch(addImageTitle(id, title)),
  removeImage: (id) => dispatch(removeImage(id)),
});

export default connect(null, mapDispatchToProps)(UploadGallery);

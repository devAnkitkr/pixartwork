import React from "react";
import { connect } from "react-redux";
import UploadGallery from "../upload-gallery/upload-gallery.component";
import imageLogo from "../../../../assets/images.svg";
import { addImage } from "../../../../redux/image-doc/image-doc-action";
import fileValidation from "../image-validation";
import { setDialogMsg } from "../../../../redux/dialog-msg/dialog-msg.action";
import DialogBox from "../../../../components/dialog-box/dialog-box.component";

import "./drop-box.styles.scss";
const DropBox = ({ imageDoc, addImage, setDialogMsg }) => {
  const handleOnDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length < 4) {
      for (let i = 0; i < files.length; i++) {
        if (fileValidation(files[i])) {
          handleImagePreview(files[i], i);
        } else setDialogMsg("wrong file type or file size exceed 10MB");
      }
    } else setDialogMsg("maximum upload exceeded");
  };
  const handleBrowseClick = (event) => {
    event.preventDefault();
    const { files } = event.target;
    if (files.length < 5) {
      for (let i = 0; i < files.length; i++) {
        if (fileValidation(files[i])) {
          handleImagePreview(files[i], i);
        } else {
          setDialogMsg("wrong file type or file size exceed 10MB");
          return (event.target.value = null);
        }
      }
    } else {
      setDialogMsg("maximum upload exceeded");
      return (event.target.value = null);
    }
  };

  const handleImagePreview = (file, id) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      addImage({
        id,
        file: reader.result,
        fileName: file.name,
        title: "",
        tags: [],
      });
    };
  };

  return (
    <div
      draggable={true}
      className="drop-box"
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <DialogBox />
      <div className="drop-image-logo">
        <img src={imageLogo} alt="logoimg" />
        <br />
        <span>Drop your images or</span>
        <button id="custom-button">
          Browse
          <input
            type="file"
            id="custom-input"
            size="60"
            multiple="multiple"
            onInput={handleBrowseClick}
          />
        </button>
      </div>

      {imageDoc.length ? (
        <div className="upload-gallery">
          {imageDoc.map((img, id) => (
            <UploadGallery src={img.file} id={img.id} key={id} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  imageDoc: state.imageDoc.imageDoc,
});

const mapDispatchToProps = (dispatch) => ({
  addImage: (imageDoc) => dispatch(addImage(imageDoc)),
  setDialogMsg: (msg) => dispatch(setDialogMsg(msg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropBox);

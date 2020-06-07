import React, { useState} from "react";
import {
  addImageTags,
  removeImageTags,
} from "../../redux/image-doc/image-doc-action";
import "./tags-input.styles.scss";
import { connect } from "react-redux";

const TagsInput = ({ id, imageDoc, addImageTags, removeImageTags }) => {
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    let { value } = e.target;
    if (e.key === "Enter" && value !== null) {
      addImageTags(id, value);
      setTags([...tags, value]);
      e.target.value = "";
    }
  };
  const removeTags = (tag) => {
    removeImageTags(tag, id);
    setTags(tags.filter(item=>item !== tag))
  };

  return (
    <div className="tags-input">
      <ul className="ul-tags">
        {tags.map((tag,id) => (
          <li className="li-tag" key={id}>
            {tag}
            <span className="tag-close-icon" onClick={()=>removeTags(tag)}>
              X
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="add tags"
        onKeyDown={addTags}
        className="input-tag rounded"
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  imageDoc: state.imageDoc.imageDoc,
});

const mapDispatchToProps = (dispatch) => ({
  addImageTags: (id, tag) => dispatch(addImageTags(id, tag)),
  removeImageTags: (tag, id) => dispatch(removeImageTags(tag, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsInput);

import { removeImage, addImageTitle, addImageTags,removeImageTags } from "./image-doc-utils";

const INITIAL_STATE = {
  imageDoc: [],
};

const imageDocReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_IMAGE_DOC":
      return {
        ...state,
        imageDoc: [...state.imageDoc, action.payload],
      };
    case "REMOVE_IMAGE_DOC":
      return {
        ...state,
        imageDoc: removeImage(state.imageDoc, action.payload),
      };
    case "SET_IMAGE_DOC_TITLE":
      return {
        ...state,
        imageDoc: addImageTitle(state.imageDoc, action.payload, action.id),
      };
    case "SET_IMAGE_DOC_TAGS":
      return {
        ...state,
        imageDoc: addImageTags(state.imageDoc, action.payload, action.id),
      };
      case 'REMOVE_IMAGE_DOC_TAGS':
        return{
          ...state,
          imageDoc:removeImageTags(state.imageDoc,action.payload,action.id)
        }
    default:
      return state;
  }
};

export default imageDocReducer;

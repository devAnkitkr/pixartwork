import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import imageDocReducer from "./image-doc/image-doc-reducer";
import dialogMsgReducer from "./dialog-msg/dialog-msg.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  imageDoc: imageDocReducer,
  dialogMsg: dialogMsgReducer,
});

export default rootReducer;

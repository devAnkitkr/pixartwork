const INITIAL_STATE = {
  msg: null,
};

const dialogMsgReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DIALOG_MSG":
      return {
        ...state,
        msg: action.payload,
      };
    case "RESET_DIALOG_MSG":
      return {
        ...state,
        msg: INITIAL_STATE.msg,
      };
    default:
      return state;
  }
};

export default dialogMsgReducer;

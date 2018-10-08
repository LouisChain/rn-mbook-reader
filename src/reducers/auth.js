import CONST from "@constants/actionType";
import uuid from "uuid";

const initialState = {
  user: null,
  errorCode: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONST.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        errorCode: null
      };
    case CONST.LOGIN_ERROR:
      return {
        ...state,
        user: null,
        errorCode: action.errorCode
      };
    case CONST.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

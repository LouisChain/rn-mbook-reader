import CONST from "@constants/actionType";
import uuid from "uuid";

const initialState = {
  anonymousId: uuid.v4(),
  accessToken: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONST.ADD_FACEBOOK_TOKEN_SUCCESS:
      return {
        ...state,
        user: null,
        accessToken: action.accessToken
      };
    case CONST.PROFILE_LOADED:
      return {
        ...state,
        user: action.user
      };

    case CONST.LOGIN_SUCCESS: {
    }
    case CONST.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

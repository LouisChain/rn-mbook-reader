import Const from "@constants/actionType"

const initialState = {
  message: []//[{key: 'key1', count: 1}, {key: 'key2', count: 0}]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Const.NOTIFICATION_BADGE_CHANGE:
      return {
        message: action.message
      }
    default:
      return state;
  }
}

export default reducer;
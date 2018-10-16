import Const from "@constants/actionType"

const initialState = {
  data: [],
  count: 0,
  isLoading: false,
  errorMessage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Const.SEARCH_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }
    case Const.SEARCH_SUCCESS:
      return {
        ...state,
        data: action.data,
        count: action.count,
        isLoading: false,
        errorMessage: action.data.length > 0 ? null : "No items matches"
      }
    case Const.SEARCH_ERROR:
      return {
        data: [],
        isLoading: false,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
}

export default reducer;
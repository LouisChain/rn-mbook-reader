import Const from "@constants/actionType"

const initialState = {
  ebooks: [],
  audiobooks: [],
  categories: [],
  isLoading: true,
  errorCode: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Const.STORE_LOADING:
      return {
        ...state,
        isLoading: true,
        errorCode: null
      }
    case Const.STORE_SUCCESS:
      return {
        ...state,
        ebooks: action.epub,
        audiobooks: action.audio,
        categories: action.categories,
        isLoading: false
      }
    case Const.STORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorCode: action.errorCode
      }
    default:
      return state;
  }
}

export default reducer;
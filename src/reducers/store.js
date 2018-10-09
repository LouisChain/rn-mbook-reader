import Const from "@constants/actionType"

const initialState = {
  ebooks: [],
  audiobooks: [],
  categories: [],
  isLoading: true,
  errorMessage: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Const.STORE_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }
    case Const.STORE_SUCCESS:
      return {
        ...state,
        ebooks: action.epub,
        audiobooks: action.audio,
        categories: action.categories,
        isLoading: false, 
        errorMessage: null
      }
    case Const.STORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage
      }
    default:
      return state;
  }
}

export default reducer;
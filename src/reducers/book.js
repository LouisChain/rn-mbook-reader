import Const from "@constants/actionType"

const initialState = {
  categoryName: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Const.GET_CATEGORY_SUCCESS:
      return {
        categoryName: action.categoryName
      }
    default:
      return state;
  }
}

export default reducer;
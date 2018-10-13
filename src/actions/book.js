import Const from "@constants/actionType";
import { getCategoryById } from "@cloud/api"
import { getErrorMessage } from "@utils/errorHandling"

export function getCategory(id) {
  return (dispatch, getState) => {
    // const state = getState();
    getCategoryById(id)
      .then((response) => {
        if (response) {
          dispatch({
            type: Const.GET_CATEGORY_SUCCESS,
            categoryName: response.data.data.name
          });
        }
      })
      .catch((error) => {
        let message = getErrorMessage(error);
        dispatch(onError(message));
      });
  };
}
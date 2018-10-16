import Const from "@constants/actionType";
import { search, getByCategory } from "@cloud/api"
import { getErrorMessage } from "@utils/errorHandling"

function onLoading() {
  return {
    type: Const.SEARCH_LOADING
  }
}

function onSuccess(payload) {
  return {
    type: Const.SEARCH_SUCCESS,
    ...payload
  }
}

function onError(errorMessage) {
  return {
    type: Const.SEARCH_ERROR,
    errorMessage
  }
}

export function doSearch(keyword) {
  return (dispatch, getState) => {
    // const state = getState();
    dispatch(onLoading());
    search(keyword)
      .then((response) => {
        if (response) {
          dispatch(onSuccess(response.data));
        }
      })
      .catch((error) => {
        let message = getErrorMessage(error);
        dispatch(onError(message));
      });
  };
}

export function fetchByCategory(category) {
  return (dispatch, getState) => {
    // const state = getState();
    dispatch(onLoading());
    getByCategory(category)
      .then((response) => {
        if (response) {
          dispatch(onSuccess(response.data));
        }
      })
      .catch((error) => {
        let message = getErrorMessage(error);
        dispatch(onError(message));
      });
  };
}
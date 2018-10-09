import Const from "@constants/actionType";
import { fetchStore } from "@cloud/api"
import { getErrorMessage } from "@utils/errorHandling"

function onLoading() {
  return {
    type: Const.STORE_LOADING
  }
}

function onSuccess(payload) {
  return {
    type: Const.STORE_SUCCESS,
    ...payload
  }
}

function onError(errorMessage) {
  return {
    type: Const.STORE_ERROR,
    errorMessage
  }
}

export function _fetchStore() {
  return (dispatch, getState) => {
    // const state = getState();
    dispatch(onLoading());
    fetchStore()
      .then((response) => {
        if (response) {
          dispatch(onSuccess(response.data.data));
        }
      })
      .catch((error) => {
        let message = getErrorMessage(error);
        dispatch(onError(message));
      });
  };
}
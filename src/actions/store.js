import Const from "@constants/actionType";
import { fetchStore } from "@cloud/api"

function loading() {
  return {
    type: Const.STORE_LOADING
  }
}

function success(payload) {
  return {
    type: Const.STORE_SUCCESS,
    ...payload
  }
}

function error(errorCode) {
  return {
    type: Const.STORE_ERROR,
    errorCode
  }
}

export function _fetchStore() {
  return (dispatch, getState) => {
    // const state = getState();
    dispatch(loading());
    fetchStore()
      .then((response) => {
        if (response) {
          dispatch(success(response.data.data));
        }
      })
      .catch((error) => {
        dispatch(error(error.code));
      });

  };
}
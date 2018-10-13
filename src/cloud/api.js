import axios from "axios";
import * as Pref from "../local/pref"
import Const from "@constants/key"

const defaultPagination = 20;
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60000
});

const refreshToken = (loggedUser) => {
  if (loggedUser) {
    return instance.post("/user/token/", {
      id: loggedUser.id,// body params
      refreshToken: loggedUser.refreshToken
    }).then(result => {
      if (result) {
        updateloggedUser(result.data);
      }
    });
  }
}

const grantAnonymous = () => {
  return instance.post("/user/grantAnonymous/")
    .then(result => {
      if (result) {
        updateloggedUser(result.data);
      }
    });
}

const updateloggedUser = async (values) => {
  await Pref.set(Const.LOGGED_IN_USER, values);
}

const fetchStore = async () => {
  let loggedUser = await Pref.get(Const.LOGGED_IN_USER);
  if (!loggedUser) {
    return grantAnonymous()
      .then(() => Pref.get(Const.LOGGED_IN_USER))
      .then(anonymous => fetchingStore(anonymous));
  } else {
    // Check if token expired
    let expiresAt = loggedUser.expiresAt;
    let expired = new Date(expiresAt).getTime();
    let current = new Date().getTime();
    if (expired < current) {
      return refreshToken(loggedUser)
        .then(() => Pref.get(Const.LOGGED_IN_USER))
        .then(updatedUser => fetchingStore(updatedUser));
    } else {
      return fetchingStore(loggedUser);
    }
  }
}

const fetchingStore = (loggedUser) => {
  return instance.get("/store/", {
    headers: {
      Authorization: "Bearer " + loggedUser.token
    },
    params: {// query param
      limit: defaultPagination
    }
  })
}

const fbLogin = (fbToken, anonymous) => {
  return instance.post("/user/fbLogin/", {
    fbToken,
    anonymous
  });
}

const getCategoryById = (id) => {
  return instance.get("/category/" + id);
}

export { fetchStore, fbLogin, getCategoryById }


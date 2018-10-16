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

const getUser = async () => {
  let loggedUser = await Pref.get(Const.LOGGED_IN_USER);
  if (!loggedUser) {
    return grantAnonymous()
      .then(() => Pref.get(Const.LOGGED_IN_USER))
  } else {
    // Check if token expired
    let expiresAt = loggedUser.expiresAt;
    let expired = new Date(expiresAt).getTime();
    let current = new Date().getTime();
    if (expired < current) {
      return refreshToken(loggedUser)
        .then(() => Pref.get(Const.LOGGED_IN_USER));
    } else {
      return Promise.resolve(loggedUser);
    }
  }
}

const fetchStore = async () => {
  return getUser()
    .then(loggedUser =>
      instance.get("/store/", {
        headers: {
          Authorization: "Bearer " + loggedUser.token
        },
        params: {// query param
          limit: defaultPagination
        }
      })
    )
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

const search = async keyword => {
  return getUser()
    .then(loggedUser =>
      instance.get("/store/search/", {
        headers: {
          Authorization: "Bearer " + loggedUser.token
        },
        params: {// query param
          keyword,
          limit: defaultPagination
        }
      })
    )
}

const getByCategory = (category) => {
  return getUser()
    .then(loggedUser =>
      instance.get("/store/category", {
        headers: {
          Authorization: "Bearer " + loggedUser.token
        },
        params: {
          category,
          offset: 0,
          limit: defaultPagination
        }
      })
    )
}

export { fetchStore, fbLogin, getCategoryById, search, getByCategory }


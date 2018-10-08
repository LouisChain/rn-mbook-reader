import Const from "@constants/actionType";
import Keys from "@constants/key"
import * as Pref from "@local/pref";
import { LoginManager, AccessToken } from "react-native-fbsdk"
import { fbLogin } from "@cloud/api";

export function loginWithFacebook() {
  return (dispatch, getState) => {
    // const state = getState();
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          console.log('LoginWithFacebook >>> Login cancelled');
        } else {
          console.log('LoginWithFacebook >>> Login success with permissions: '
            + result.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let fbToken = data.accessToken.toString();
              Pref.get(Keys.LOGGED_IN_USER)
                .then(anonymousUser => fbLogin(fbToken, anonymousUser ? anonymousUser.id : null ))
                .then(result => {
                  dispatch({
                    type: Const.LOGIN_SUCCESS,
                    user: result.data
                  });
                  return Promise.resolve(result.data);
                })
                .then((loggedUser) => Pref.set(Keys.LOGGED_IN_USER, loggedUser))
                .catch(error => {
                  dispatch({
                    type: Const.LOGIN_ERROR,
                    errorCode: error
                  });
                });
            }
          )
        }
      }, error => {
        console.log('Login fail with error: ' + error);
      }
      );
  };
}

export function doLogout() {
  return (dispatch, getState) => {
    Pref.remove(Keys.LOGGED_IN_USER)
      .then(() => {
        dispatch({
          type: Const.LOGOUT_SUCCESS
        });
      })
      .catch(error => {
        console.log("Cannot remove item key: " + Keys.LOGGED_IN_USER);
      })
  }
}
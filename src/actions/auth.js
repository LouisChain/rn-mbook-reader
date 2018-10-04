import Const from "@constants/actionType";
import { LoginManager, AccessToken } from "react-native-fbsdk"

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
              return dispatch({
                type: Const.ADD_FACEBOOK_TOKEN_SUCCESS,
                accessToken: data.accessToken.toString()
              })
            }
          )
        }
      }, error => {
        console.log('Login fail with error: ' + error);
      }
      );

  };
}
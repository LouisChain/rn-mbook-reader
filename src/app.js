/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AppNavigator } from "@containers/navigator";
import { Provider } from "react-redux";
import configStore from "@store/configStore";

export default class App extends Component {
  render() {
    return (
      <Provider store={configStore().store}>
        <AppNavigator />
      </Provider>
    );
  }
}

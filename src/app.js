/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AppWithThemeNavigator } from "@containers/themes";
import { Provider } from "react-redux";
import configStore from "@store/configStore";

export default class App extends Component {
  render() {
    return (
      <Provider store={configStore().store}>
        <AppWithThemeNavigator />
      </Provider>
    );
  }
}

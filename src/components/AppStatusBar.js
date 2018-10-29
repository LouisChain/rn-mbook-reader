import React, { PureComponent } from "react";
import { StatusBar } from "react-native";

export default class AppStatusBar extends PureComponent {
  render() {
    return <StatusBar backgroundColor="white" barStyle="dark-content" />;
  }
}

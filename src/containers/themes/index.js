import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { RootNavigator } from "@containers/navigator"
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import PropTypes from "prop-types";
import Theme from "@themes"
import Resources from "@resources"
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

class ThemeContainer extends Component {

  static childContextTypes = {
    theme: PropTypes.object,
    resource: PropTypes.object
  }

  _theme = Theme;
  _resource = Resources;

  getChildContext() {
    return {
      theme: this._theme,
      resource: this._resource
    }
  }
  static router = {
    ...RootNavigator.router,
    getStateForAction: (action, lastState) => {
      return RootNavigator.router.getStateForAction(action, lastState);
    },
  };

  componentDidUpdate(lastProps) {
    // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, state } = this.props.navigation;
    if (state.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <RootNavigator navigation={navigation} />
      </View>
    );
  }
}

const navMiddleWare = createReactNavigationReduxMiddleware(
  "appNavigator",
  state => state.nav
);

const AppWithNavigationState = reduxifyNavigator(ThemeContainer, "appNavigator");

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppWithThemeNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { ThemeContainer, navMiddleWare, AppWithThemeNavigator };
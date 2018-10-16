import React, { Component } from "react";
import { Button, View, BackHandler } from "react-native";
import { connect } from "react-redux";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import PropTypes from "prop-types";
import Theme from "@themes"
import Resources from "@resources"
import { NavigationActions } from "react-navigation";
import routeConfigMap from "./router";
import theme from "@themes";
import IconBadge from "@containers/notifications/badge"

const BottomTabStack = createBottomTabNavigator(routeConfigMap.home, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === "library") {
        iconName = "book";
      } else if (routeName === "profile") {
        iconName = "account-circle";
      } else if (routeName === "store") {
        iconName = "store"
      }
      return (
        <IconBadge Key={routeName} set="MaterialIcons" name={iconName} size={24} tintColor={tintColor} />
      );
    }
  }),
  initialRouteName: "library",
  tabBarOptions: {
    activeTintColor: theme.bottomTab.active,
    inactiveTintColor: theme.bottomTab.inactive,
    style: {
      backgroundColor: "white"
    }
  },
  animationEnabled: true,
  swipeEnabled: true
});

const RootStack = createStackNavigator(
  {
    BottomTab: {
      screen: BottomTabStack,
      navigationOptions: ({ navigation }) => ({
        header: null,
        title: "Home",
        headerRight: (
          <Button
            onPress={() => navigation.navigate("settings")}
            title="Settings"
            color="#fff"
          />
        )
      })
    },
    Book: routeConfigMap.book,
    Search: routeConfigMap.search
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.palette.background
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "normal"
      }
    }
  }
);

class RootNavigator extends React.Component {
  static router = RootStack.router;
  render() {
    return <RootStack navigation={this.props.navigation} />;
  }
}

class RootContainer extends Component {

  static childContextTypes = {
    appTheme: PropTypes.object,
    resource: PropTypes.object
  }

  _theme = Theme;
  _resource = Resources;

  getChildContext() {
    return {
      appTheme: this._theme,
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

const AppWithNavigationState = reduxifyNavigator(RootContainer, "appNavigator");

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, RootContainer, AppNavigator, navMiddleWare };

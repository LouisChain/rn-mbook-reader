import React from "react";
import { Button } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
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
    }
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

export { RootNavigator };

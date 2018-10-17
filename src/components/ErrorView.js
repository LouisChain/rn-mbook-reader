import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from "prop-types"
import { Avatar } from "react-native-elements";

export default class ErrorView extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object,
    resource: PropTypes.object
  }

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onPress: PropTypes.func
  }

  render() {
    const { appTheme } = this.context;
    return (
      <View
        style={[styles.centerScreen, { backgroundColor: appTheme.palette.background }]}>
        <Text style={{ justifyContent: "center", textAlign: 'center' }}>{this.props.errorMessage}</Text>
        <Avatar
          small
          rounded
          icon={{ name: 'refresh' }}
          onPress={this.props.onPress}
          activeOpacity={0.5}
          containerStyle={{ margin: 8 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 38,
  }
})
import React, { PureComponent } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from "prop-types"

export default class LoadingView extends PureComponent {

  static contextTypes = {
    appTheme: PropTypes.object
  }

  render() {
    const { appTheme } = this.context;
    return (
      <ActivityIndicator
        style={[styles.centerScreen, { backgroundColor: appTheme.palette.background }]}
        size="large"
        color={appTheme.bottomTab.active}
      />
    )
  }
}

const styles = StyleSheet.create({
  centerScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
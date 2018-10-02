import React, { PureComponent } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from "prop-types"

export default class LoadingView extends PureComponent {

  static contextTypes = {
    theme: PropTypes.object,
    resource: PropTypes.object
  }

  render() {
    const { theme } = this.context;
    return (
      <ActivityIndicator
        style={[styles.centerScreen, { backgroundColor: theme.palette.background }]}
        size="large"
        color={theme.bottomTab.active}
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
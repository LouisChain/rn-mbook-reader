import React, { PureComponent } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from "prop-types"

export default class LoadingView extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  }

  static propTypes = {
    size: PropTypes.string.isRequired
  }

  render() {
    const { appTheme } = this.context;
    return (
      <ActivityIndicator
        style={[styles.centerScreen, { backgroundColor: appTheme.palette.background }]}
        size={this.props.size}
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
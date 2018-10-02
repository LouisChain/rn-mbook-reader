import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";

export default class VBookItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    stars: PropTypes.number,
    onPress: PropTypes.object
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.homeListItem}
        onPress={this.props.onPress}
      >
        <View >
          <FastImage
            source={{ uri: this.props.cover }}
            style={styles.cover}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.author}>by {this.props.author}</Text>
          <Text>Stars: {this.props.stars}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cover: {
    width: 58,
    height: 120
  },
  info: {
    paddingLeft: 16,
    flex: 1,
    flexDirection: "column"
  },
  title: {
    fontWeight: 'bold',
    color: "black",
    fontSize: 16
  },
  author: {
    color: "gray",
    fontSize: 12
  }
});
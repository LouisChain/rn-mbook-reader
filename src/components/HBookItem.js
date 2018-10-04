import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";

export default class HBookItem extends PureComponent {
  static propTypes = {
    book: PropTypes.object,
    onPress: PropTypes.func
  }

  render() {
    let { cover, coverLink, title, author, stars } = this.props.book;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          <FastImage
            source={{ uri: coverLink || cover }}
            style={styles.cover}
          />
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.author} numberOfLines={1}>by {author}</Text>
          {/* <Text>Stars: {stars}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }
}

const w = 88;
const h = 128;
const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    flex: 1,
    width: w
  },
  cover: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    width: w,
    height: h
  },
  title: {
    marginTop: 8,
    color: "black",
    fontSize: 12,
    flexWrap: "wrap"
  },
  author: {
    color: "gray",
    fontSize: 10,
    flexWrap: "wrap"
  }
});
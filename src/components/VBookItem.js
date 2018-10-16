import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Badge } from "native-base"
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { removeMultiBlankLines } from "@utils/string"

export default class VBookItem extends PureComponent {
  static propTypes = {
    book: PropTypes.object,
    onPress: PropTypes.func
  }

  render() {
    let { title, author, format, cover, coverLink, description } = this.props.book;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.container}
      >
        <View style={{ flexDirection: 'row' }}>
          <View>
            <FastImage
              source={{ uri: coverLink || cover }}
              style={styles.cover}
            />
            <Badge style={styles.type}>
              <Text style={{ color: 'gray', fontSize: 14 }}>{format}</Text>
            </Badge>
          </View>
          <View style={{ flexDirection: 'column', paddingHorizontal: 16, flex: 1 }}>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <Text numberOfLines={1} style={styles.author}>by {author}</Text>
            <Text numberOfLines={2} style={styles.description}>{removeMultiBlankLines(description)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const w = 72;
const h = 108;
const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  cover: {
    width: w,
    height: h
  },
  title: {
    flexDirection: 'row',
    color: "black",
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: "wrap"
  },
  author: {
    marginTop: 4,
    color: "gray",
    fontSize: 14,
    flexWrap: "wrap"
  },
  description: {
    flexDirection: 'row',
    marginTop: 4,
    color: "gray",
    fontSize: 12,
    flexWrap: "wrap"
  },
  type: {
    position: 'absolute',
    bottom: 0,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    maxHeight: 24
  }
});
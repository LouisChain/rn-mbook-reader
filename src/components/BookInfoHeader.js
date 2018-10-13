import React, { PureComponent } from "react"
import { View, Text, Badge } from "native-base"
import FastImage from "react-native-fast-image"
import PropTypes from "prop-types"

export default class BookInfoHeader extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    let { cover, coverLink, title, author, stars, format } = this.props.book;
    return (
      <View style={styles.container}>
        <View >
          <FastImage
            source={{ uri: coverLink || cover }}
            style={styles.cover}
          />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={3} style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.author}>by {author}</Text>
          <Text style={styles.stars}>Stars: {this.props.stars}</Text>
          <Badge style={styles.type}>
            <Text style={{ color: 'gray', fontSize: 14 }}>{format}</Text>
          </Badge>
        </View>
      </View >
    );
  }
}

const w = 88;
const h = 128;
const styles = {
  container: {
    flex: 1,
    flexDirection: "row"
  },
  info: {
    marginHorizontal: 18,
    flexDirection: 'column'
  },
  cover: {
    width: w,
    height: h
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
    flexWrap: "wrap"
  },
  author: {
    marginTop: 8,
    color: "gray",
    fontSize: 14,
    flexWrap: "wrap",
  },
  type: {
    marginTop: 8,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  stars: {
    marginTop: 8,
    color: "gray",
    fontSize: 14,
    flexWrap: "wrap",
  }
};
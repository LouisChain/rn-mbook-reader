import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
import HBookItem from "./HBookItem";

const listItemHeight = 150;
export default class HBookList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    navigation: PropTypes.object
  }

  render() {
    return (
      <FlatList
        horizontal={true}
        data={this.props.data}
        keyExtractor={item => item._id}
        renderItem={this.renderItem}
        showsHorizontalScrollIndicator={false}
      // ItemSeparatorComponent={ListItemSeperator}
      // getItemLayout={this.getItemLayout}
      />
    )
  }

  onBookItemPress = item => {
    this.props.navigation.navigate("Book", { book: item });
  };

  renderItem = (rowData) => {
    return (
      <HBookItem
        book={rowData.item}
        onPress={() => this.onBookItemPress(rowData.item)}
      />
    );
  };

  getItemLayout = (data, index) => {
    return {
      length: listItemHeight,
      offset: index * (listItemHeight + 0.3),
      index
    };
  };
}
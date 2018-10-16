import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import VBookItem from "./VBookItem";

const listItemHeight = 150;
export default class VBookList extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    navigation: PropTypes.object
  }

  render() {
    return (
      <FlatList
        style={{ padding: 16 }}
        data={this.props.data}
        keyExtractor={item => item._id}
        renderItem={this.renderItem}
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
      <VBookItem
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
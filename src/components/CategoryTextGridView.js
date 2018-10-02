import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import PropTypes from "prop-types";

export default class App extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    numColumns: PropTypes.number
  }

  renderItem = ({ item, index }) => {
    return <TouchableOpacity style={{
      flex: 1,
      margin: 5,
      minWidth: 120,
      maxWidth: 300,
      height: 48,
      maxHeight: 48,
      borderColor: 'gray',
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 3
    }}
      onPress={() => this.onPressCategory(item)}>
      <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  }

  onPressCategory = item => {
    // Handle Press on category
  }

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={this.props.numColumns}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={item => item._id}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: "black",
    fontSize: 16,
    padding: 8
  }
});

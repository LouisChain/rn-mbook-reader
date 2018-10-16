import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import PropTypes from "prop-types";

export default class App extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    numColumns: PropTypes.number,
    navigation: PropTypes.object
  }

  renderItem = ({ item, index }) => {
    return <TouchableOpacity style={[styles.container, (index === 0 || index === 1) ? { marginTop: 0 } : { marginTop: 4 }]}
      onPress={() => this.onPressCategory(item)}>
      <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  }

  onPressCategory = item => {
    this.props.navigation.navigate("Search", { category: item })
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
  container: {
    flex: 1,
    margin: 4,
    minWidth: 120,
    maxWidth: 300,
    height: 48,
    maxHeight: 48,
    borderColor: 'gray',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 3
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: "black",
    fontSize: 14,
    padding: 8
  }
});

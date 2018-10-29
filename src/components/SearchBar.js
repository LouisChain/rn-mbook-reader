import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Body, Button, Text } from "native-base";
import Icon from "@components/Icon";

export default class SearchBar extends PureComponent {
  render() {
    return (
      <Body>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            borderColor: "#gray",
            borderWidth: 1,
            margin: 8,
            maxHeight: 38,
            borderRadius: 60,
            alignItems: "center"
          }}
          iconLeft
          onPress={this.props.onPress}
        >
          <Icon name="search" style={{ marginHorizontal: 8 }} color='gray' />
          <Text
            style={{
              color: "#bbb",
              fontSize: 14,
              flexDirection: "row",
              flex: 1
            }}
          >
            Tìm theo tên, tác giả danh mục...
          </Text>
        </TouchableOpacity>
      </Body>
    );
  }
}

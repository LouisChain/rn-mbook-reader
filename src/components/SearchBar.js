import React, { PureComponent } from "react"
import { Body, Button, Text } from "native-base"
import Icon from "@components/Icon"

export default class SearchBar extends PureComponent {
  render() {
    return (
      <Body>
        <Button light full rounded style={{
          margin: 8,
          maxHeight: 38,
          justifyContent: 'center'
        }} iconLeft onPress={this.props.onPress}>
          <Icon name='search' color='gray' style={{ position: 'absolute', left: 16, top: 8 }} />
          <Text style={{ color: '#bbb', fontSize: 14 }}>Search here...</Text>
        </Button>
      </Body>
    )
  }
}
import React, { PureComponent } from "react"
import { View, Body, Content, Badge, Text } from "native-base"
// import { Badge } from "react-native-elements"
import PropTypes from "prop-types"

export default class Tags extends PureComponent {
  static propTypes = {
    tags: PropTypes.string.isRequired,
    onTagPress: PropTypes.func
  }

  render() {
    let array = this.props.tags;
    array = array.split(',');
    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Tags</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            array.map((value, index, values) => (
              // <Badge
              //   containerStyle={{ backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, minHeight: 32}}
              //   onPress={() => this.props.onTagPress(value)}
              //   value={value.trim()}
              //   textStyle={{ color: 'gray' }} >
              // </Badge>
              <Badge style={{
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: 'white',
                marginRight: 8,
                marginTop: 8
              }} key={value}>
                <Text style={{ color: 'gray', fontSize: 14 }}>{value.trim()}</Text>
              </Badge>
            ))
          }
        </View>
      </View >
    );
  }
}
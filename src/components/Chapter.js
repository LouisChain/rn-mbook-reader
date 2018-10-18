import React, { PureComponent } from "react"
import {
  View, Text, Container, List, ListItem, Content
} from 'native-base';
import PropTypes from "prop-types"
import { Divider } from "react-native-elements";

export default class Chapter extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  }

  static propTypes = {
    title: PropTypes.string,
    chapters: PropTypes.array,
    navigator: PropTypes.object
  }

  render() {
    let { appTheme } = this.context;
    let { title, chapters } = this.props;
    return (
      <Container>
        <View style={{ padding: 16, paddingTop: 48 }}>
          <Text numberOfLines={1} style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ color: 'gray', marginTop: 8 }}>2/{chapters.length} chapters</Text>
        </View>
        <Divider />
        <Content>
          <List dataArray={this.props.chapters}
            renderRow={(item) =>
              <ListItem>
                <Text>{item.title}</Text>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
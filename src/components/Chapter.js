import React, { PureComponent } from "react"
import {
  View, Text, Container, List, ListItem, Content, Body
} from 'native-base';
import PropTypes from "prop-types"
import { Divider } from "react-native-elements";
import IconStateDownload from "./IconStateDownload"

export default class Chapter extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    chapters: PropTypes.array
  }

  onChapterSelected = (item) => {
  }

  render() {
    let { appTheme } = this.context;
    let { id, title, chapters } = this.props;
    return (
      <Container>
        <View style={{ padding: 16, paddingTop: 24 }}>
          <Text numberOfLines={1} style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ color: 'gray', marginTop: 8 }}>2/{chapters.length} chapters</Text>
        </View>
        <Divider />
        <Content>
          <List dataArray={this.props.chapters}
            renderRow={(item) =>
              <ListItem
                onPress={() => this.onChapterSelected(item)}>
                <Body>
                  <Text numberOfLines={3}>{item.title}</Text>
                </Body>
                <IconStateDownload url={item.media} id={id} />
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

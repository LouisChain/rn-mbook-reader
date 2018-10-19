import React, { PureComponent } from "react"
import { connect } from "react-redux"
import {
  Container, Header, View, Button, Body, Right, Left, Text, Title, Drawer, Content
} from 'native-base';
import Icon from "@components/Icon"
import PropTypes from "prop-types";
import Chapter from "@components/Chapter"
import Player from "@components/Player"

class AudioReader extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  closeDrawer = () => {
    this.drawer._root.close()
  }
  openDrawer = () => {
    this.drawer._root.open()
  }

  render() {
    let { appTheme } = this.context;
    let book = this.props.navigation.state.params.book;
    let { title } = book;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Chapter id={book._id} title={book.title} chapters={book.mbookLink} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <Header style={{ backgroundColor: appTheme.palette.background }}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' set='MaterialIcons' />
              </Button>
            </Left>
            <Body>
              <Title>{title}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' set='MaterialIcons' />
              </Button>
            </Right>
          </Header>
          <Content style={{ flex: 1 }}>
            <Player book={book} />
          </Content>
        </Container>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.audioReader.errorMessage
  }
}

export default connect(mapStateToProps)(AudioReader);
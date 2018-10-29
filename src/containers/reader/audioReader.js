import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  View,
  Button,
  Body,
  Right,
  Left,
  Text,
  Title,
  Content
} from "native-base";
import { Easing } from "react-native";
import Drawer from "react-native-drawer-menu";
import Icon from "@components/Icon";
import PropTypes from "prop-types";
import Chapter from "@components/Chapter";
import Player from "@components/Player";

class AudioReader extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  render() {
    let { appTheme } = this.context;
    let book = this.props.navigation.state.params.book;
    let { title } = book;
    return (
      <Drawer
        ref={c => (this._Drawer = c)}
        style={{ flex: 1 }}
        drawerWidth={300}
        drawerContent={
          <Chapter id={book._id} title={book.title} chapters={book.mbookLink} />
        }
        type={Drawer.types.Overlay}
        // customStyles={{ drawer: styles.drawer }}
        drawerPosition={Drawer.positions.Right}
        onDrawerOpen={() => {
          console.log("Drawer is opened");
        }}
        onDrawerClose={() => {
          console.log("Drawer is closed");
        }}
        easingFunc={Easing.ease}
      >
        <Container>
          <Header style={{ backgroundColor: appTheme.palette.background }}>
            <Left>
              <Button transparent>
                <Icon name="arrow-back" set="MaterialIcons" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }}>{title}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this._Drawer.openDrawer()}>
                <Icon name="menu" set="MaterialIcons" />
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
  };
}

export default connect(mapStateToProps)(AudioReader);

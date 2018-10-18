import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { connect } from "react-redux";
import { loginWithFacebook, doLogout } from "@actions/auth";
import Icon from "@components/Icon";
import { Avatar, SocialIcon, Divider } from "react-native-elements";
import { Button } from 'native-base'
import PropTypes from "prop-types";

class Profile extends PureComponent {
  static contextTypes = {
    appTheme: PropTypes.object
  };

  render() {
    let user = this.props.user;
    let { appTheme } = this.context;
    let iconColor = appTheme.color.inactiveColor;
    return (
      <ScrollView style={styles.container}>
        {user ?
          <View style={styles.itemMain}>
            <Avatar
              xlarge
              rounded
              source={{ uri: user.avatar }}
              onPress={() => console.log("Clicked Avatar!")}
              activeOpacity={0.7}
              containerStyle={{}} />
            <Text style={{ fontSize: 22, fontWeight: "bold", paddingTop: 16 }}>{user.name}</Text>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Button transparent >
                <Text style={styles.itemCount}>Đã đọc: </Text>
                <Text style={styles.itemCount2}>123</Text>
              </Button>
              <View
                style={{
                  width: 2,
                  borderLeftWidth: 1,
                  borderLeftColor: 'gray',
                  marginHorizontal: 4,
                  height: 10,
                  alignSelf: 'center'
                }}
              />
              <Button transparent>
                <Text style={styles.itemCount}>Đã nghe: </Text>
                <Text style={styles.itemCount2}>98</Text>
              </Button>
            </View>
          </View> :
          <View style={styles.itemMain}>
            <Avatar
              xlarge
              rounded
              icon={{ name: 'account-circle' }}
              onPress={() => console.log("Clicked Avatar!")}
              activeOpacity={0.7}
              containerStyle={{}} />
            < SocialIcon
              onPress={() => this.onLogin()}
              title='Log In With Facebook'
              button
              type='facebook'
              style={{ paddingHorizontal: 16, marginVertical: 16 }}
            />
          </View>
        }
        <View style={{
          marginTop: 16,
          borderRadius: 3,
          backgroundColor: "white"
        }}>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="favorite" size={24} color={iconColor} />
            <Text style={styles.itemText}>I love this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="report" size={24} color={iconColor} />
            <Text style={styles.itemText}>I need improve this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="settings" size={24} color={iconColor} />
            <Text style={styles.itemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="help" size={24} color={iconColor} />
            <Text style={styles.itemText}>Donate us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="hearing" size={24} color={iconColor} />
            <Text style={styles.itemText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="star" size={24} color={iconColor} />
            <Text style={styles.itemText}>Version 0.1</Text>
          </TouchableOpacity>
        </View>
        {user ?
          <TouchableOpacity style={{ padding: 24, justifyContent: "center", alignItems: "center" }}
            onPress={() => this.onLogout()}>
            <Text style={styles.logout}>Log out</Text>
          </TouchableOpacity> :
          null
        }
      </ScrollView >
    );
  }

  onLogin = () => {
    this.props.loginWithFacebook();
  }

  onLogout = () => {
    Alert.alert(
      'Confirm log out',
      'Are you sure to log out?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Confirm', onPress: () => this.props.doLogout() },
      ],
      { cancelable: false }
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    errorCode: state.auth.errorCode
  }
}

export default connect(mapStateToProps, { loginWithFacebook, doLogout })(Profile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16
  },
  itemMain: {
    justifyContent: 'center',
    paddingTop: 60,
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 8
  },
  itemText: {
    fontSize: 16,
    paddingLeft: 16
  },
  itemCount: {
    color: 'gray',
    fontSize: 12
  },
  itemCount2: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold'
  },
  logout: {
    fontSize: 18,
    color: 'red'
  }
});

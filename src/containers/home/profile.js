import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { loginWithFacebook, doLogout } from "@actions/auth";
import Icon from "@components/Icon";
import { Avatar, SocialIcon } from "react-native-elements";
import PropTypes from "prop-types";

class Profile extends PureComponent {
  static contextTypes = {
    theme: PropTypes.object
  };

  render() {
    let user = this.props.user;
    let { theme } = this.context;
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
            <Text style={{ fontSize: 22, fontWeight: "bold", paddingVertical: 16 }}>{user.name}</Text>
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
            <Icon set="MaterialIcons" name="favorite" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>I love this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="report" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>I need improve this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="settings" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="help" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>Donate us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="hearing" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemRow}>
            <Icon set="MaterialIcons" name="hearing" size={24} color={theme.bottomTab.inactive} />
            <Text style={styles.itemText}>Version 0.1</Text>
          </TouchableOpacity>
        </View>
        {user ?
          <TouchableOpacity style={{ padding: 24, justifyContent: "center", alignItems: "center" }}
            onPress={() => this.onLogout()}>
            <Text>Log out</Text>
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
    this.props.doLogout();
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
    backgroundColor: '#F5FCFF',
    padding: 16
  },
  itemMain: {
    paddingVertical: 32,
    justifyContent: 'center',
    paddingTop: 60,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: "white"
  },
  itemRow: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  itemText: {
    paddingHorizontal: 16
  }
});

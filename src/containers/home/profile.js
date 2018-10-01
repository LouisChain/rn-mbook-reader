import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Profile extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Profile!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

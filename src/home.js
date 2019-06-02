// @format
// @flow

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_KEY } from './config';

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type HomeProps = {
  goToAuth: () => void,
};
type HomeState = {
  username: string,
};
export default class Home extends Component<HomeProps, HomeState> {
  state = {
    username: '',
  };

  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      this.setState({ username: user });
    } catch (err) {
      console.error('unexpected error!', err);
    }
  }

  logoutAsync = async () => {
    const { goToAuth } = this.props;
    try {
      await AsyncStorage.removeItem(USER_KEY);
      goToAuth();
    } catch (err) {
      console.error('Unexpected error!, ', err);
    }
  };

  render() {
    // const { username } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello {this.state.username}!</Text>
        <Button onPress={this.logoutAsync} title="Sign Out" />
      </View>
    );
  }
}

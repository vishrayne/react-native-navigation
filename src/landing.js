// @format
// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

type LandingProps = {
  goToHome: () => void,
  goToAuth: () => void,
};
export default class Landing extends Component<LandingProps> {
  async componentDidMount() {
    // eslint-disable-next-line no-console
    const { goToHome, goToAuth } = this.props;
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      if (user) {
        goToHome();
      } else {
        goToAuth();
      }
    } catch (err) {
      console.error('user auth error', err);
      goToAuth();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

import React, { Component } from 'react';

import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../components/Button'

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button label='Logout' onPress={this._logoutAsync} />
      </View>
    );
  }

  _logoutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

HomeScreen.navigationOptions = {
  title: 'Welcome',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

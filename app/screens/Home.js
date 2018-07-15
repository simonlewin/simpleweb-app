import React, { Component } from 'react';

import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../components/Button';

import { getUser } from '../data/actions/api';

import { connect } from 'react-redux';

class HomeScreen extends Component {
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    const { token } = this.props;
    console.log('didMount ', token);
    this.props.onLoad(token);
  }

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

const mapStateToProps = state => ({
  user: state.user,
  token: state.access_token
});

const mapDispatchToProps = dispatch => {
  return {
    onLoad: token => dispatch(getUser(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

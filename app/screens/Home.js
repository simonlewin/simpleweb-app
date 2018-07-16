import React, { Component } from 'react';

import {
  // AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from '../components/Button';

import { getUser } from '../data/actions/api';
import { removeUser } from '../data/actions/state';

import { connect } from 'react-redux';

class HomeScreen extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const { token } = this.props;
    this.props.onLoad(token);
  }

  // handleSubmit handles button press
  handleSubmit() {
    this.props.onPress();
    this.props.navigation.navigate('Auth');
  }

  render() {
    const {user} = this.props;
    return (
      <View style={styles.container}>
        {user ?
          <Text style={styles.heading}>
            Hi {user}{'\n'}{'\n'}
              <Text style={styles.text}>
              You are now logged in.
            </Text>
          </Text>
        : '' }
        <Button
          label='Logout' 
          onPress={this.handleSubmit} 
        />
      </View>
    );
  }

  // _logoutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate('Auth');
  // };
}

HomeScreen.navigationOptions = {
  title: 'Welcome',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-around',
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,  
  }
});

const mapStateToProps = state => ({
  user: state.user,
  token: state.access_token
});

const mapDispatchToProps = dispatch => {
  return {
    onLoad: token => dispatch(getUser(token)),
    onPress: () => dispatch(removeUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

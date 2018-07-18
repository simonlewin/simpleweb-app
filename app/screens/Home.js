import React, { Component } from 'react';

import {
  ActivityIndicator,
  StatusBar,
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

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (token !== prevProps.token) {
      this.props.onLoad(token);
    }
  }

  // handleSubmit handles button press
  handleSubmit() {
    this.props.onPress();
    this.props.navigation.navigate('Auth');
  }

  render() {
    const { name } = this.props;
    console.log(name);
    console.log(this.props);

    return (
      name ? 
        <View style={styles.container}>
          <Text style={styles.heading}>
            Hi { name }{'\n'}{'\n'}
              <Text style={styles.text}>
              You are now logged in.
            </Text>
          </Text>
          <Button
            label='Logout' 
            onPress={this.handleSubmit} 
          />
        </View>
      : 
        <View style={styles.activity}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
  }
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
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  name: state.name,
  token: state.access_token
});

const mapDispatchToProps = dispatch => {
  return {
    onLoad: token => dispatch(getUser(token)),
    onPress: () => dispatch(removeUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

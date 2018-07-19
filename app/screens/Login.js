import React, { Component } from 'react';

// import react-native components
import {
  ActivityIndicator,
  Alert,
  AlertIOS,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

// import custom component
import MyButton from '../components/Button';

// import forms library
import t from 'tcomb-form-native';

import { connect } from 'react-redux';

import { passwordGrant } from '../data/actions/api';
import { clearError } from '../data/actions/state';

import Expo, { Constants } from 'expo';

// set up login form
const Form = t.form.Form;

// form fields
const User = t.struct({
  email: t.String,
  password: t.String,
});

// form options and error messages
const options = {
  auto: 'placeholders',
  fields: {
    email: {
      autoCapitalize: 'none',
      error: 'Please enter an email address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Please enter a password'
    }
  },
};

class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: {
        email: '',
        password: '',
      },
      isSigningIn: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePress = this.handlePress.bind(this);
	}

  // handlePress handles alert button press
  // dispatches action to clear error obj
  handlePress() {
    this.props.onPress();
  }

  // componentDidUpdat lifecycle method 
  componentDidUpdate(prevProps) {
    // navigate to App stack if token is set in state
    if (this.props.token !== prevProps.token) {
      this.props.navigation.navigate('App');
    }
    // if error has changed and error property is not blank trigger alert 
    if ((this.props.error !== prevProps.error) && this.props.error.error !== '' ) {
      this.setState({
        isSigningIn: false,
      })
      Alert.alert(
        'Error - please try again',
        `${this.props.error.status} - ${this.props.error.message}`,    
        [
          { text: 'OK', onPress: () => this.handlePress() }
        ],
        { cancelable: false }
      );
    };
  };

  // onChange to handle keyboard input
  onChange = (value) => {
    this.setState({ value });
  }

  // reset form fields
  clearForm() {
    this.setState({
      value: {
        email: '', 
        password: ''
      }
    });
  }

  // handleSubmit handles login button press
  handleSubmit() {
    // get form fields
    const value = this._form.getValue();
    
    if (value) {
      this.props.onSubmit(value);
      this.setState({
        isSigningIn: true,
      })
      this.clearForm();
    }
  }

  scanBiometrics = async () => {
    let result = await Expo.Fingerprint.authenticateAsync('Authenticate with Touch ID');
    if (result.success) {
      AlertIOS.alert(
        'Success',
        'Authenticated Successfully'
      );
    } else {
      AlertIOS.alert(
        'Error',
        'Authentication Failed'
      );
    }
  };

  render() {
    // if isSigningIn render activity indicator else render form
    const { isSigningIn } = this.state;
    return (
      isSigningIn ?
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      :
        <View style={styles.container}>
          <Form 
            type={User} 
            ref={c => this._form = c}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
          <MyButton 
            label='Login' 
            onPress={this.handleSubmit} 
          />
          <Button
            title="Register"
            onPress={() => this.props.navigation.navigate('Register')}
          />
          <Button
            title="Authenticate with Touch ID"
            onPress={() => this.scanBiometrics()}
          />
        </View>
    );
  }
}

LoginScreen.navigationOptions = {
  title: 'Please login',
}

// connect dispatch actions and props to state
// onSubmit button to request for access token in exchange for email and password
// onPress for alert to clear error object 
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => dispatch(passwordGrant(data)),
    onPress: () => dispatch(clearError()),
  }
}

const mapStateToProps = state => ({
  token: state.access_token,
  error: state.error,
});

// container style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

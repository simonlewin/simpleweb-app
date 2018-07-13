import React, { Component } from 'react';

import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

import Button from '../components/Button'

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  auto: 'placeholders',
  fields: {
    email: {
      // label: null,
      error: 'Please enter an email address'
    },
    password: {
      // label: 'Enter password',
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
        password: ''
      }
    }
	}

  onChange = (value) => {
    this.setState({value});
  }

  _loginAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  }

  clearForm() {
    this.setState({value: {email: '', password: ''}});
  }

  handleSubmit = async () => {
    const value = this._form.getValue();
    if (value) {
      console.log('value: ', value);
      this.clearForm();
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form 
          type={User} 
          ref={c => this._form = c}
          options={options}
          value={this.state.value}
          onChange={this.onChange}
        />
        {/* <Button label='Login' onPress={this._loginAsync} /> */}
        <Button label='Login' onPress={this.handleSubmit} />
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  title: 'Please login',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 50,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;

import React, { Component } from 'react';

// import react-native components
import {
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';

// import custom component
import Button from '../components/Button';

// import forms library
import t from 'tcomb-form-native';

import { connect } from 'react-redux';

import { passwordGrant } from '../data/actions/api';

// set up login form
const Form = t.form.Form;

// fields
const User = t.struct({
  email: t.String,
  password: t.String,
});

// options and error messages
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
        password: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
	}

  // onChange handler to manage local state
  onChange = (value) => {
    this.setState({value});
  }

  // reset form fields
  clearForm() {
    this.setState({value: {email: '', password: ''}});
  }

  handleSubmit() {
    const value = this._form.getValue();
    if (value) {
      this.props.onPress(value);
      this.clearForm();
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
        <Button 
          label='Login' 
          onPress={this.handleSubmit} 
        />
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  title: 'Please login',
}

const mapDispatchToProps = dispatch => {
  return {
    onPress: data => dispatch(passwordGrant(data)),
  }
}

const mapStateToProps = (state) => ({
  token: state.access_token,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

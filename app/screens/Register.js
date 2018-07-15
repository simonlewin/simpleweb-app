import React, { Component } from 'react';

// import react-native components
import {
  StyleSheet,
  View,
} from 'react-native';

// import custom component
import Button from '../components/Button';

// import forms library
import t from 'tcomb-form-native';

import { connect } from 'react-redux';

import { postRegister } from '../data/actions/api';

// set up register form
const Form = t.form.Form;

// fields
const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  confirmPassword: t.String,
});

// options and error messages
const options = {
  auto: 'placeholders',
  fields: {
    name: {
      error: 'Please enter your name'
    },
    email: {
      autoCapitalize: 'none',
      error: 'Please enter your email address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Please enter a password'
    },
    confirmPassword: {
      password: true,
      secureTextEntry: true,
      error: 'Please confirm your password'
    }
  },
};

class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: {
        name: '',
        email: '',
        password: '',
        confirm: ''
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
    this.setState({
      value: {
        name: '',
        email: '', 
        password: '',
        confirm: '',
      }
    });
  }

  handleSubmit() {
    const value = this._form.getValue();

    console.log(value, value.password, value.confirmPassword);

    if (value && (value.password === value.confirmPassword)) {
      delete value.confirmPassword
      console.log(value);
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
        <Button 
          label='Register' 
          onPress={this.handleSubmit} 
        />
      </View>
    );
  }
}

RegisterScreen.navigationOptions = {
  title: 'Please register',
}

const mapDispatchToProps = dispatch => {
  return {
    onPress: data => dispatch(postRegister(data)),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default connect(null, mapDispatchToProps)(RegisterScreen);

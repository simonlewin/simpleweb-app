import React, { Component } from 'react';

// import react-native components
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import custom component
import MyButton from '../components/Button';

// import forms library
import t from 'tcomb-form-native';

import { connect } from 'react-redux';

import { passwordGrant } from '../data/actions/api';

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
        password: ''
        // login flag to show ActivityIndicator
        // register flag to merge login and register screens
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.navigation.navigate('App');
    }
  }

  // onChange handles keyboard input
  onChange = (value) => {
    this.setState({value});
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

  // handleSubmit handles button press
  handleSubmit() {
    const value = this._form.getValue();
    if (value) {
      this.props.onPress(value);
      this.clearForm();
    }
  }

  render() {
    // const {token} = this.props;
    // if loading flag (SignInRequested) is set to true show activity indicator
    // else show form
    return (
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
  // map new loading flag signInRequested
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

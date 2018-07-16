import React, { Component } from 'react';

// import react-native components
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import custom component
import Button from '../components/Button';

// import forms library
import t from 'tcomb-form-native';

import { connect } from 'react-redux';

// import api action
import { postRegister } from '../data/actions/api';

// set up register form
const Form = t.form.Form;

// form fields
const User = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
  confirmPassword: t.String,
});

// form options and error messages
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
        confirm: '',
      },
      isSigningIn: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
	}

  // onChange handles keyboard input
  onChange = (value) => {
    this.setState({ value });
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

  // handleSubmit handles button press
  handleSubmit() {
    // get form fields
    const value = this._form.getValue();

    if (value ) {
      // if passwords match and dispatch action and clear form else trigger alert
      if (value.password === value.confirmPassword) {
        const data = { 
          name: value.name, 
          email: value.email, 
          password: value.password 
        };
        
        this.props.onPress(data);
        this.clearForm();
      } else {
        Alert.alert(
          'Passwords don\'t match',
          'Please confirm your password',
          [
            { text: 'OK', },
          ],
          { cancelable: false }
        )
      }
    }
  }

  render() {
    // const { token } = this.props;
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
        {/* <Text>{ token }</Text> */}
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

// const mapStateToProps = state => ({
//   token: state.access_token,
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default connect(null, mapDispatchToProps)(RegisterScreen);

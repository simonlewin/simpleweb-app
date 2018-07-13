// import React from 'react';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/AuthLoading';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

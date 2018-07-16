import React, { Component } from 'react';

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import initial from './data/initial';
import reducer from './data/reducer';

// import AuthLoadingScreen from './screens/AuthLoading';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import RegisterScreen from './screens/Register';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initial,
  composeEnhancers(applyMiddleware(thunk)),
);

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen, Register: RegisterScreen });

const RootNavigator = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    // initialRouteName: 'AuthLoading',
    initialRouteName: 'Auth',
  }
);

class Nav extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}

export default Nav;

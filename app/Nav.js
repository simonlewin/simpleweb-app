import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import RegisterScreen from './screens/Register';

const AppStack = createStackNavigator({ Home: HomeScreen });
// const AuthStack = createStackNavigator({ SignIn: LoginScreen, Register: RegisterScreen });
const AuthStack = createStackNavigator({ Register: RegisterScreen, SignIn: LoginScreen });

const RootNavigator = createSwitchNavigator(
  {
    AuthStart: RegisterScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthStart',
  }
);

export default RootNavigator;

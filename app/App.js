import React, { Component } from 'react';

// redux and react-redux integration
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

// redux-persist and react wrapper
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// thunk middleware for redux
import thunk from 'redux-thunk';

// initial state and reducer
import initial from './data/initial';
import reducer from './data/reducer';

// app navigation
import RootNavigator from './Nav';

// loading screen
import LoadingScreen from './screens/Loading';

// redux-persist config
const persistConfig = {
  key: 'root',
  storage,
};

// redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// wrap reducer in redux-persist function
const persistedReducer = persistReducer(persistConfig, reducer);

// create store with redux-persist persistReducer
const store = createStore(
  persistedReducer, 
  initial, 
  composeEnhancers(applyMiddleware(thunk))
);

// create persisted storage
const persistor = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* react wrapper delays rendering until state is retrieved */}
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    )
  }
}

export default App;

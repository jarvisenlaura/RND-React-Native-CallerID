import {AppRegistry, Platform} from 'react-native';
import {composeWithDevTools} from 'redux-devtools-extension';
import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {fetchNumberInfo} from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(fetchNumberInfo);

const CallerID = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('CallerID', () => CallerID);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('CallerID', {rootTag});
}

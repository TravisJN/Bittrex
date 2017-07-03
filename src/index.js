import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectMarket, fetchMarket } from './actions/index.js'
import rootReducer from './reducers/reducer.js'

const loggerMiddleWare = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,  // lets us dispatch() functions
    loggerMiddleWare  // neat middleware that logs actions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

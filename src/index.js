import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import { App } from './app';
import './index.css';
require('dotenv').config()

ReactDOM.render(
 <Provider store={configureStore()}>
  <App />
 </Provider>,
 document.getElementById('root')
);

serviceWorker.unregister();

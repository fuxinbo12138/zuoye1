import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import appleStore from './stores/appleStore'

ReactDOM.render(
  <Provider appleStore={appleStore}><App /></Provider>,
  document.getElementById('root')
);


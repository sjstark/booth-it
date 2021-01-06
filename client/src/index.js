import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './store'

const store = configureStore()

function Root() {
  return (
    <BrowserRouter >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './store'
import HolderSVG from './components/HolderSVG';

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

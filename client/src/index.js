import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './store'
import ShowExplore from './components/ShowPages/ShowExplore';
import Loader from './components/Loader'

const store = configureStore()

let loaderHeight = 200

function Root() {
  return (
    <BrowserRouter >
      <Provider store={store}>
        <App />
        {/* <div className="full-page flex-centered loader-wrapper logo-background__background-wrapper">
          <Loader duration={2500} style={{ width: `${loaderHeight * 0.86602543}px`, height: `${loaderHeight}px`, margin: "200px auto" }} />
        </div> */}
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

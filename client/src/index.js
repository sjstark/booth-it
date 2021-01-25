import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MetaTags from 'react-meta-tags'

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MetaTags>
        {/* <!-- Primary Meta Tags --> */}
        <title>BOOTH IT - The Premier Online Tradeshow Platform</title>
        <meta name="title" content="BOOTH IT - The Premier Online Tradeshow Platform" />
        <meta name="description"
          content="Booth It is a web app for hosting conference events online. Events are split into individual 'booths' to encourage more meaningful conversations." />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://booth-it.herokuapp.com/" />
        <meta property="og:title" content="BOOTH IT - The Premier Online Tradeshow Platform" />
        <meta property="og:description" content="Booth It is a web app for hosting conference events online. Events are split into individual 'booths' to
          encourage more meaningful conversations."/>
        <meta property="og:image" content="./media/splashscreen-meta.gif" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://booth-it.herokuapp.com/" />
        <meta property="twitter:title" content="BOOTH IT - The Premier Online Tradeshow Platform" />
        <meta property="twitter:description" content="Booth It is a web app for hosting conference events online. Events are split into individual 'booths' to
          encourage more meaningful conversations."/>
        <meta property="twitter:image" content="./media/splashscreen-meta.gif" />

      </MetaTags>
      <Root />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from '../NavBar'
import ShowExplore from '../ShowPages/ShowExplore';
import ShowDetails from '../ShowPages/ShowDetails';

import './MainContent.scss'

function Create() {
  return (
    <div>
      Form
    </div>
  )
}


function Base() {
  return (
    <div>
      Root
    </div>
  )
}


export default function MainContent() {
  return (
    <div className="full-page" >
      <NavBar />
      <div className="main_content">
        <Switch >
          <Route path="/shows" exact component={ShowExplore} />
          <Route path="/shows/:SID" component={ShowDetails} />
          <Route path="/create-show" exact component={Create} />
          <Route path="/" component={Base} />
          {/* <Route>
            <NoMatch />
          </Route> */}
        </Switch>
      </div>
    </div >
  )
}

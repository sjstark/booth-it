import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavBar from '../NavBar'
import ShowExplore from '../ShowPages/ShowExplore';
import ShowDetails from '../ShowPages/ShowDetails';
import BoothDetails from '../BoothPages/BoothDetails';
import CreateShowForm from '../ShowPages/CreateShowForm';
import EditShowForm from '../ShowPages/EditShowForm';
import CreateBoothForm from '../BoothPages/CreateBoothForm';
import MainFlavor from './MainFlavor';

import './MainContent.scss'


export default function MainContent() {
  return (
    <div className="full-page" >
      <NavBar />
      <div className="main_content">
        <Switch >
          <Route path="/shows/:SID/booths/:BID" component={BoothDetails} exact />
          <Route path="/shows/:SID/create-booth" exact component={CreateBoothForm} />
          <Route path="/shows/:SID/edit" exact component={EditShowForm} />
          <Route path="/shows/:SID" exact component={ShowDetails} />
          <Route path="/shows" exact component={ShowExplore} />
          <Route path="/create-show" exact component={CreateShowForm} />
          <Route path="/" component={MainFlavor} />
          {/* <Route>
            <NoMatch />
          </Route> */}
        </Switch>
      </div>
    </div >
  )
}

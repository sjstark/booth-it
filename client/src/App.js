import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux'

import { restoreUser } from './store/session';

import SplashPage from "./components/SplashPage"
import Loader from "./components/Loader"
import Modals from "./components/Modals"
import MainContent from './components/MainContent'

function App({ user, modals }) {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)
  const inviteLoc = location.pathname == '/invites'

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    if (!user) {
      history.replace('/')
    }
  }, [user])

  const loaderHeight = 100;

  return (
    <>
      {!isLoaded && (
        <div className="full-page flex-centered loader-wrapper logo-background__background-wrapper">
          <Loader duration={2500} style={{ width: `${loaderHeight * 0.86602543}px`, height: `${loaderHeight}px`, margin: "200px auto" }} />
        </div>
      )}
      {isLoaded && (
        <>
          {user && !inviteLoc ?
            <>
              <MainContent />
            </>
            :
            <SplashPage />
          }
          <Modals />
        </>
      )}
      <a
        className="logo-background__github-link"
        href="https://github.com/sjstark/booth-it"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i className="fab fa-github"></i>
      </a>
    </>
  )
}

const mapStateToProps = state => ({ user: state.user, modals: state.modals })

export default connect(mapStateToProps)(App)

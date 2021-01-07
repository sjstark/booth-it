import React, { useState, useEffect } from 'react'

import { useDispatch, connect, useSelector } from 'react-redux'

import { restoreUser } from './store/session';

import SplashPage from "./components/SplashPage"
import Loader from "./components/Loader"
import Modals from "./components/Modals"
import LogoutButton from "./components/auth/LogoutButton"

function App({ user, modals }) {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  const loaderHeight = 100;

  return (
    <>
      {!isLoaded && (
        <div className="full-page flex-centered loader-wrapper logo-background__background-wrapper">
          <Loader duration={2500} style={{ width: `${loaderHeight * 0.86602543}px`, height: `${loaderHeight}px`, margin: "200px auto" }} />
        </div>
      )}
      <>
        {!user && (
          <SplashPage />
        )}
        {user && (
          <>
            <div>You passed!</div>
            {user.firstName}
            {user.lastName}
            <LogoutButton />
          </>
        )}
        <Modals />
      </>

    </>
  )
}

const mapStateToProps = state => ({ user: state.user, modals: state.modals })

export default connect(mapStateToProps)(App)

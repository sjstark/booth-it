import React, { useState, useEffect } from 'react'

import { useDispatch, connect } from 'react-redux'

import { restoreUser } from './store/session';

import SplashPage from "./components/SplashPage"
import Loader from "./components/Loader"
import Modals from "./components/Modals"

function App({ user, modals }) {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log(modals)
  }, [modals])

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  console.log(user)

  return (
    <>
      {!user && (
        <SplashPage />
      )}
      {user && (
        <div>You passed!</div>
      )}
      <Modals />
    </>
  )
}

const mapStateToProps = state => ({ user: state.user, modals: state.modals })

export default connect(mapStateToProps)(App)

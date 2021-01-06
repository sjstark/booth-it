import React, { useState, useEffect } from 'react'

import { useDispatch, connect } from 'react-redux'

import { restoreUser } from './store/session';

import SplashPage from "./components/SplashPage"
import Loader from "./components/Loader"

function App({ user }) {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  console.log(user)

  const height = 100

  return (
    <>
      {/* <Loader duration={2500} style={{ width: `${height * 0.86602543}px`, height: `${height}px`, margin: "200px auto" }} /> */}
      {!user && (
        <SplashPage />
      )}
      {user && (
        <div>You passed!</div>
      )}
    </>
  )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(App)

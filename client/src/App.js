import React, { useState, useEffect } from 'react'

import { useDispatch, connect } from 'react-redux'

import { restoreUser } from './store/session';

import SplashPage from "./components/SplashPage"

function App({ user }) {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

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
    </>
  )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(App)

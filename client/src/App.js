import React, { useState, useEffect } from 'react'

import { useDispatch, connect } from 'react-redux'

import { restoreUser } from './store/session';

export default function App() {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>

    </>
  )
}

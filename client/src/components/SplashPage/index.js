import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSpring, animated, config } from 'react-spring'

import axios from 'axios'

import LogoBackground from '../LogoBackground'
import Button from '../Button'

import { login, logout } from '../../store/session'

import "./SplashPage.scss"

import { Switch, Route, useHistory, useLocation, useParams } from 'react-router-dom'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}


function LoginOptions() {
  const dispatch = useDispatch()

  const modals = useSelector(state => state.modals)

  const loginDemo = (e) => {
    e.stopPropagation()
    dispatch(login({
      email: 'demo@user.io',
      password: "password"
    }))
  }

  return (
    <>
      <Button color="primary" onClick={modals.signup.handleOpen}>Sign Up</Button>
      <Button color="secondary" onClick={modals.login.handleOpen}>Log In</Button>
      <Button color="tertiary" onClick={loginDemo}>Log In as Demo User</Button>
    </>
  )
}


function InviteBody() {
  const history = useHistory()
  const dispatch = useDispatch()

  const query = useQuery()
  const SID = query.get("SID")
  const BID = query.get("BID")
  const IID = query.get("IID")

  const user = useSelector(state => state.user)

  const [validInvite, setValidInvite] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    (async () => {
      let requestString = `/api/invites/${IID}?SID=${SID}`
      requestString += BID ? `&BID=${BID}` : ""
      const res = await fetch(requestString)
      const resJSON = await res.json()
      setValidInvite(resJSON.errors ? false : resJSON)
      setIsLoaded(true)
    })()
  }, [])

  const acceptInvite = async (e) => {

    let requestString = `/api/invites/${IID}?SID=${SID}`
    requestString += BID ? `&BID=${BID}` : ""

    const res = await axios.post(requestString)
    if (res.data.success) {
      history.push(`/shows/${SID}/create-booth`)
    } else {
      setErrors(res.data.errors)
    }
  }

  const onLogout = async (e) => {
    await dispatch(logout());
  }

  return (
    <>
      {
        isLoaded
          ?
          (
            validInvite
              ?
              <>
                <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
                <h2>You've received an invite to participate in <span style={{ fontFamily: '"Bungee", sans-serif' }}>{validInvite.show}</span>.</h2>
                {
                  validInvite.booth
                    ?
                    <h2>The invite is linked to <span style={{ fontFamily: '"Bungee", sans-serif' }}>{validInvite.booth}</span>.</h2>
                    :
                    <h2>You will be creating a new booth for your company!</h2>
                }
                {
                  user
                    ?
                    <>
                      <Button
                        color="primary"
                        onClick={acceptInvite}
                      >
                        Accept Invite as {user.firstName} {user.lastName}
                      </Button>
                      <Button
                        color="warning"
                        onClick={onLogout}
                      >
                        Logout of {user.firstName} {user.lastName}
                      </Button>
                    </>
                    :
                    <>
                      <div>Please login or sign up to accept.</div>
                      <LoginOptions />
                    </>
                }

              </>
              :
              <>
                <p>
                  We're sorry, but it seems as though you've received an invalid invite or the invite you've re ceived has already been accepted.
                </p>
                {
                  errors.length > 0 &&
                  (
                    <>
                      <p>
                        Below are some additional errors that may help:
                      </p>
                      {errors.map(error => <p key={error}>{error}</p>)}
                    </>
                  )
                }
                <p>
                  Please contact the show host.
                </p>
                <Button
                  color="primary"
                  onClick={() => history.push('/')}
                >Go To Main Page</Button>
              </>
          )
          :
          <>
            Loading...
          </>
      }
    </>
  )
}


function SplashForm() {

  const props = useSpring({
    transform: "translate(0, 0vh)",
    from: {
      transform: "translate(0, 100vh)"
    },
    delay: 200,
    config: config.gentle
  })

  return (
    <>
      <animated.div style={props} className="splash-form__container">
        <Switch>
          <Route path="/invites" component={InviteBody} />
          <>
            <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
            <LoginOptions />
          </>
        </Switch>
      </animated.div>
    </>
  )
}

export default function SplashPage() {

  return (
    <>
      <LogoBackground />
      <div className="full-page flex-centered">
        <SplashForm />
      </div>
    </>
  )
}

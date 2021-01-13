import React, { useState, useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import { useSpring, animated, config } from 'react-spring'

import axios from 'axios'

import LogoBackground from '../LogoBackground'
import Button from '../Button'

import { login } from '../../store/session'

import "./SplashPage.css"
import { Switch, Route, useHistory, useLocation, useParams } from 'react-router-dom'


function useQuery() {
  return new URLSearchParams(useLocation().search)
}


function InviteBody() {
  const query = useQuery()
  const SID = query.get("SID")
  const BID = query.get("BID")
  const IID = query.get("IID")

  useEffect(() => {
    (async () => {
      let requestString = `/api/invites/${IID}?SID=${SID}`
      requestString += BID ? `&BID=${BID}` : ""
      const res = fetch(requestString)
    })()
  }, [])

  return (
    <>
      <div>
        {query.get("BID")}
      </div>
      <div>
        {query.get("SID")}
      </div>
      <div>
        {query.get("IID")}
      </div>
    </>
  )
}


function SplashForm({ modals }) {
  const location = useLocation()
  const history = useHistory()

  // const [body, setBody] = useState(
  //   <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
  // )

  const dispatch = useDispatch()
  const props = useSpring({
    transform: "translate(0, 0vh)",
    from: {
      transform: "translate(0, 100vh)"
    },
    delay: 200,
    config: config.gentle
  })

  const loginDemo = (e) => {
    e.stopPropagation()
    dispatch(login({
      email: 'demo@user.io',
      password: "password"
    }))
  }


  // useEffect(() => {
  //   if (location.pathname.startsWith('/invite')) {
  //     setBody(<InviteBody />)
  //   } else if (location.pathname != "/") {
  //     history.replace('/')
  //   }
  // }, [location])

  return (
    <>
      <animated.div style={props} className="splash-form__container">
        <Switch>
          <Route path="/invites" component={InviteBody} />
          <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
        </Switch>
        <Button color="primary" onClick={modals.signup.handleOpen}>Sign Up</Button>
        <Button color="secondary" onClick={modals.login.handleOpen}>Log In</Button>
        <Button color="tertiary" onClick={loginDemo}>Log In as Demo User</Button>
      </animated.div>
    </>
  )
}

const mapStateToProps = state => ({ modals: state.modals })

const MappedSplashForm = connect(mapStateToProps)(SplashForm)

export default function SplashPage() {

  return (
    <>
      <LogoBackground />
      <div className="full-page flex-centered">
        <MappedSplashForm />
        <a
          className="logo-background__github-link"
          href="https://github.com/sjstark/booth-it"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </>
  )
}

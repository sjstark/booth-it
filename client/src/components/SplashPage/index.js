import React from 'react'
import { connect } from 'react-redux'
import { useSpring, animated, config } from 'react-spring'

import LogoBackground from '../LogoBackground'
import Button from '../Button'

import "./SplashPage.css"

function SplashForm({ modals }) {
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
        <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
        <Button color="primary" onClick={modals.signup.handleOpen}>Sign Up</Button>
        <Button color="secondary" onClick={modals.login.handleOpen}>Log In</Button>
        <Button color="secondary" onClick={() => { console.log("Log In! Dmemo!") }}>Log In as Demo User</Button>
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

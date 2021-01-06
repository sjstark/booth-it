import React from 'react'
import { useSpring, animated, config } from 'react-spring'

import LogoBackground from '../LogoBackground'
import Button from '../Button'

import "./SplashPage.css"

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
        <h1>Welcome to <span style={{ fontFamily: '"Bungee", sans-serif' }}>Booth It</span></h1>
        <Button color="primary" onClick={() => { console.log("Sign Up!") }}>Sign Up</Button>
        <Button color="secondary" onClick={() => { console.log("Log In!") }}>Log In</Button>
        <Button color="secondary" onClick={() => { console.log("Log In! Dmemo!") }}>Log In as Demo User</Button>
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

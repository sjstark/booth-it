import React, { useState, useEffect } from 'react'

import { useSpring, animated } from 'react-spring'

import Logo from './index.js'

import './LogoWithText.scss'

export default function LogoWithText(props) {

  const fadeInRight = useSpring({
    to: {
      opacity: 100,
      transform: "translate(0)"
    },
    from: {
      opacity: 0,
      transform: "translate(-100%)"
    }
  })

  const fadeInRightDelay = useSpring({
    to: {
      opacity: 100,
      transform: "translate(0)"
    },
    from: {
      opacity: 0,
      transform: "translate(-100%)"
    },
    delay: 250
  })

  const spinIn = useSpring({
    to: {
      transform: "rotate(0deg)",
      opacity: 1
    },
    from: {
      transform: "rotate(-720deg)",
      opacity: 0
    }
  })

  return (
    <div style={props.style} onClick={props.onClick} className="logo-with-text">
      <Logo />

      <animated.span style={fadeInRight} className="logo-with-text__top">BOOTH</animated.span>
      <animated.span style={fadeInRightDelay} className="logo-with-text__bottom">IT</animated.span>
    </div>
  )
}

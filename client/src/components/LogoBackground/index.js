import React from 'react'

import { useSpring, animated, config } from 'react-spring'

import LogoPath from "../Logo"

import './LogoBackground.css'

export default function LogoBackground() {
  const props = useSpring({
    transform: "scale(1)",
    from: {
      transform: "scale(0)",
    },
    config: config.gentle,
  })

  return (
    <>
      <div className="logo-background__background-wrapper">
        <animated.div style={props}>
          <div className="logo-background__logo-container">
            <LogoPath style={props} />
          </div>
        </animated.div>
      </div>
    </>
  )
}

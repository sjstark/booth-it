import React from 'react'
import { useSpring, animated, config } from 'react-spring'

import "./Loader.css"

function TopLeft() {
  return (
    <div className="logo-path__hexagon logo-path__hexagon--TL">
      <div className="logo-path__hexagon-color" />
    </div>
  )
}

function BottomLeft() {
  return (
    <div className="logo-path__hexagon logo-path__hexagon--BL">
      <div className="logo-path__hexagon-color" />
    </div>
  )
}

function Right() {
  return (
    <div className="logo-path__hexagon logo-path__hexagon--R">
      <div className="logo-path__hexagon-color" />
    </div>
  )
}

export default function Loader() {
  const props = useSpring({
    transform: "rotate(720deg)",
    width: "100%",
    height: "100%",
    from: {
      transform: "rotate(0deg)"
    },
    config: config.molasses
  })

  return (
    <animated.div style={props}>
      <section className="logo-path__logo-container">
        <TopLeft />
        <BottomLeft />
        <Right />
      </section>
    </animated.div>
  )
}

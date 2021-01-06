import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

import "./Loader.css"


function interpRadian(r, max) {
  let num = (max * Math.sin(r + (2 * Math.PI) / 1.6))
  return num > 0 ? num : 0
}


function TopLeft({ duration }) {
  const bounceInterp = r => {
    return `translate(${-1 * interpRadian(r, 16)}%, ${-1 * interpRadian(r, 25)}%)`
  }

  const { radians } = useSpring({
    from: {
      radians: 0
    },
    to: async next => {
      while (true) {
        await next({
          radians: 2 * Math.PI
        })
      }
    },
    reset: true,
    config: {
      duration: duration
    }
  })

  return (
    <animated.div style={{ transform: radians.interpolate(bounceInterp) }} className="loader__hexagon loader__hexagon--TL" >
      <div className="loader__hexagon-color" />
    </animated.div>
  )
}


function BottomLeft({ duration }) {
  const bounceInterp = r => {
    return `translate(${-1 * interpRadian(r, 16)}%, ${interpRadian(r, 25)}%)`
  }

  const { radians } = useSpring({
    from: {
      radians: 0
    },
    to: async next => {
      while (true) {
        await next({
          radians: 2 * Math.PI
        })
      }
    },
    reset: true,
    config: {
      duration: duration
    }
  })

  return (
    <animated.div style={{ transform: radians.interpolate(bounceInterp) }} className="loader__hexagon loader__hexagon--BL">
      <div className="loader__hexagon-color" />
    </animated.div>
  )
}


function Right({ duration }) {
  const bounceInterp = r => {
    return `translate(${interpRadian(r, 33)}%, 0%)`
  }

  const { radians } = useSpring({
    from: {
      radians: 0
    },
    to: async next => {
      while (true) {
        await next({
          radians: 2 * Math.PI
        })
      }
    },
    reset: true,
    config: {
      duration: duration
    }
  })

  return (
    <animated.div style={{ transform: radians.interpolate(bounceInterp) }} className="loader__hexagon loader__hexagon--R">
      <div className="loader__hexagon-color" />
    </animated.div>
  )
}


export default function Loader({ style: { ...styles }, duration }) {
  const props = useSpring({
    from: {
      transform: "rotate(0deg)",
      ...styles
    },
    to: async next => {
      while (true) {
        await next({
          transform: "rotate(360deg)",
          ...styles
        })
      }
    },
    reset: true,
    config: {
      duration: duration
    }
  })

  return (
    <animated.div style={props} className="loader__logo-container">
      <TopLeft duration={duration} />
      <BottomLeft duration={duration} />
      <Right duration={duration} />
    </animated.div>
  )
}

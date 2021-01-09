import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { useDispatch } from 'react-redux'

import { logout } from "../../store/session";
import LogoWithText from '../Logo/LogoWithText'

import './NavBar.scss'

export default function NavBar() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const dropIn = useSpring({
    from: {
      transform: "translate(0, -100%)"
    },
    to: {
      transform: "translate(0, 0%)"
    },
  })

  const slideFromRight = useSpring({
    from: {
      transform: "translate(50vw)"
    },
    to: {
      transform: "translate(0vw)"
    }
  })


  return (
    <animated.div style={dropIn} className="NavBar">
      <LogoWithText onClick={() => history.push('/')} style={{ width: "60px", cursor: "pointer" }} />

      <div className="NavBar__right">
        <animated.div style={slideFromRight} onClick={() => history.push('/shows')}>
          EXPLORE
        </animated.div>
        <animated.div style={slideFromRight} onClick={() => history.push('/create-show')}>
          HOST
        </animated.div>
        <animated.div style={slideFromRight} onClick={onLogout}>
          LOGOUT
        </animated.div>
      </div>

    </animated.div>
  )
}

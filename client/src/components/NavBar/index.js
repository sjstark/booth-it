import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSpring, animated, useTrail, useTransition } from 'react-spring'
import { useDispatch } from 'react-redux'

import { logout } from "../../store/session";
import LogoWithText from '../Logo/LogoWithText'

import './NavBar.scss'

function NavBarRight({ children, ...props }) {
  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    transform: "translate(0vw)",
    opacity: 1,
    from: { opacity: 0, transform: "translate(100%)" },
    delay: 100
  })

  return (
    <div className="NavBar__right" {...props}>
      {trail.map((style, idx) => (
        <animated.div
          key={items[idx]}
          style={style}
        >
          {items[idx]}
        </animated.div>
      ))}
    </div>
  )
}

export default function NavBar() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const dropIn = useSpring({
    // from: {
    //   transform: "translate(0, -100%)"
    // },
    to: {
      transform: "translate(0, 0%)"
    },
  })


  return (
    <animated.div style={dropIn} className="NavBar">
      <LogoWithText onClick={() => history.push('/')} style={{ width: "60px", cursor: "pointer" }} />

      <NavBarRight>
        <div onClick={() => history.push('/shows')}>
          EXPLORE
        </div>
        <div onClick={() => history.push('/create-show')}>
          HOST
        </div>
        <div onClick={onLogout}>
          LOGOUT
        </div>
      </NavBarRight>

    </animated.div>
  )
}

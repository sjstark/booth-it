import React from 'react'

import { useHistory } from 'react-router-dom'

import { animated, config, useSpring } from 'react-spring'

import Graphic1 from '../../media/undraw_conversation_h12g.svg'
// import Graphic2 from '../../media/undraw_success_factors_fay0.svg'

export default function MainFlavor() {
  const history = useHistory()

  const fadeIn = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    },
    config: config.slow
  })

  const riseUp = useSpring({
    from: {
      transform: "translateY(100vh)"
    },
    to: {
      transform: "translateY(0)"
    },
    config: config.gentle
  })

  return (
    <div className="main-flavor">
      <div className="main-flavor__background">
        <animated.img style={fadeIn} src={Graphic1} />
        {/* <img src={Graphic2} /> */}
      </div>
      <animated.div style={riseUp} className="main-flavor__foreground">
        <h1>Welcome to
          <span style={{ fontFamily: '"Bungee", sans-serif', marginLeft: ".2em" }}>Booth It</span>
        </h1>
        <p>
          We've created this site to help fill the void of a reliable, online trade show. Here, organizers can <em title="Host a Show" onClick={() => history.push('/create-show')}>HOST</em> a show and invite companies to join as partners.
        </p>
        <p>
          Guests can visit public shows through the <em title="Explore Public Shows" onClick={() => history.push('/shows')}>EXPLORE</em> page or, if a show is private, can access the show via the show's link shared by the organizers.
        </p>
      </animated.div>
    </div>
  )
}

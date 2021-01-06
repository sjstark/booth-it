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
        <Button disabled color="primary" onClick={(e) => console.log("CLICK!!")}>Button1</Button>
        <Button color="primary" onClick={(e) => console.log("CLICK!!")}>Button1</Button>
        <Button disabled color="secondary" onClick={(e) => console.log("CLICK!!")}>Button2</Button>
        <Button color="secondary" onClick={(e) => console.log("CLICK!!")}>Button2</Button>
        <Button disabled color="warning" onClick={(e) => console.log("CLICK!!")}>Go Back</Button>
        <Button color="warning" onClick={(e) => console.log("CLICK!!")}>Go Back</Button>
        <Button disabled color="caution" onClick={(e) => console.log("CLICK!!")}>Delete everything</Button>
        <Button color="caution" onClick={(e) => console.log("CLICK!!")}>Delete everything</Button>
        <Button disabled onClick={(e) => console.log("CLICK!!")}>Button3</Button>
        <Button onClick={(e) => console.log("CLICK!!")}>Button3</Button>
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
      </div>
    </>
  )
}

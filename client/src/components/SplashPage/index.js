import React from 'react'

import LogoBackground from '../LogoBackground'
import Button from '../Button'

import "./SplashPage.css"

function SplashForm() {
  return (
    <div className="splash-form__container">
      <Button onClick={(e) => console.log("CLICK!!")}>Button</Button>
    </div>
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

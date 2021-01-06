import React from 'react'

import LogoPath from "../Logo"

import './LogoBackground.css'

export default function LogoBackground() {
  return (
    <div className="logo-background__background-wrapper">
      <div className="logo-background__logo-container">
        <LogoPath />
      </div>
    </div>
  )
}

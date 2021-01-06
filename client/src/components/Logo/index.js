import React from 'react'

import "./LogoPath.css"

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

export default function LogoPath() {
  return (
    <section className="logo-path__logo-container">
      <TopLeft />
      <BottomLeft />
      <Right />
    </section>
  )
}

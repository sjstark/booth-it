import React from 'react'

import './HexGrid.css'

export default function HexGrid() {
  let items = []
  for (let i = 1; i <= 44; i++) {
    items.push(
      <li key={i} className="hex-grid__item">
        <div className="hex-grid__content">
          {i}
        </div>
      </li>
    )
  }

  return (
    <>
      {/* <div style={{ width: "100vw", height: "60px", backgroundColor: "salmon" }} /> */}
      <ul className="hex-grid__list">
        {items}
      </ul>
    </>
  )
}

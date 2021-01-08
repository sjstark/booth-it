import React, { useState, useEffect } from 'react'

import './HexGrid.scss'

export default function HexGrid(props) {
  const [numCols, setNumCols] = useState(20)

  // let items = []
  // for (let i = 1; i <= numCols; i++) {
  //   items.push(
  //     <li key={i} className="hex-grid__item">
  //       <div className="hex-grid__content">
  //         {i}
  //       </div>
  //     </li>
  //   )
  // }

  let children = React.Children.toArray(props.children)

  return (
    <>
      {/* <div style={{ width: "100vw", height: "60px", backgroundColor: "salmon" }} /> */}
      <ul className="hex-grid__list">
        {children.map((child, idx) => {
          return (
            <li key={`hex-${idx}`} className="hex-grid__item" >
              <div className="hex-grid__content" style={{ backgroundColor: child.props.hexColor || props.defaultHexColor || "white" }}>
                {child}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

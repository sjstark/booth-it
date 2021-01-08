import React, { useState, useEffect, useRef } from 'react'

import './HexGrid.scss'

export default function HexGrid(props) {
  const [width, setWidth] = useState("200px")
  const [padding, setPadding] = useState(props.padding || "20px")
  const [colSize, setColSize] = useState('s')

  const containerEle = useRef({ current: { offsetWidth: 200 } })

  useEffect(() => {
    setPadding(props.padding)
  }, [props.padding])

  useEffect(() => {
    setWidth(containerEle.current.offsetWidth)
  }, [containerEle.current.offsetWidth])

  useEffect(() => {
    let size
    if (1200 <= width) {
      size = "xl"
    }
    else if (1000 <= width && width < 1200) {
      size = "l"
    }
    else if (800 <= width && width < 1000) {
      size = "ml"
    }
    else if (600 <= width && width < 800) {
      size = "m"
    }
    else if (400 <= width && width < 600) {
      size = "ms"
    }
    else if (width < 400) {
      size = "s"
    }
    setColSize(size)
  }, [width])

  let children = React.Children.toArray(props.children)

  return (
    <div ref={containerEle} style={{ width: props.width, maxWidth: "1600px", minWidth: "300px" }} className={`hex-grid__col-${colSize}`}>
      <ul className="hex-grid__list" style={{ padding: padding }}>
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
    </div >
  )
}

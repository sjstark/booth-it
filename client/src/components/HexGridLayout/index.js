import React, { useState, useEffect, useRef } from 'react'

import './HexGrid.scss'


function HexTileCard(props) {

  return (
    <div className="hex-grid__card">
      <section>{props.title}</section>
      <section>{props.description}</section>
    </div>
  )
}


function HexTile(props) {
  let child = props.child

  const [cardViz, setCardViz] = useState(false)

  const showCard = (e) => {
    setCardViz(true)
  }

  const hideCard = (e) => {
    setCardViz(false)
  }

  return (
    <li className="hex-grid__item" >
      <div
        className="hex-grid__content"
        style={{ backgroundColor: child.props.hexColor || props.defaultHexColor || "white" }}
        onMouseEnter={showCard}
        onMouseLeave={hideCard}
      >
        {child}
      </div>
      {cardViz && (<HexTileCard title={child.props.title} description={child.props.description} />)}
    </li>
  )
}


export default function HexGrid(props) {
  const containerEle = useRef()

  const [width, setWidth] = useState("200px")
  const [padding, setPadding] = useState(props.padding || "20px")
  const [colSize, setColSize] = useState('s')


  useEffect(() => {
    setPadding(props.padding)
  }, [props.padding])

  useEffect(() => {
    const resizeHex = () => setWidth(containerEle.current.offsetWidth)
    window.addEventListener('resize', resizeHex)
    resizeHex()
    return (() => {
      window.removeEventListener('resize', resizeHex)
    })
  }, [containerEle])

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
    <div ref={containerEle} style={{ ...props.style, maxWidth: "1600px", minWidth: "300px" }} className={`hex-grid__col-${colSize}`}>
      <ul className="hex-grid__list" style={{ padding: padding }}>
        {children.map((child, idx) => (<HexTile key={`hex-${idx}`} child={child} />))}
      </ul>
    </div >
  )
}

import React, { useState, useEffect, useRef } from 'react'
import { animated, useTrail } from 'react-spring'

import './HexGrid.scss'


// function HexTileCard(props) {

//   return (
//     <div className="hex-grid__card-container">
//       <div className={`hex-grid__card ${!props.show && " hex-grid__card-hide"}`}>
//         <div className="hex-grid__card-shadow">
//           <div className="hex-grid__card-shadow-crop" />
//         </div>
//         <div className="hex-grid__card-crop" />
//         <section className="hex-grid__card-title">{props.title}</section>
//         <section className="hex-grid__card-subtitle">{props.description}</section>

//       </div>
//     </div>
//   )
// }


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
    <animated.li
      className="hex-grid__item"
      onMouseLeave={hideCard}
      onClick={child.props.onClick}
      style={props.style}
    >
      <div
        className="hex-grid__content"
        style={{ backgroundColor: child.props.hexColor || props.defaultHexColor || "white" }}
        onMouseEnter={showCard}
      >
        {child}
      </div>
      {/* <HexTileCard title={child.props.title} description={child.props.description} show={cardViz} /> */}
    </animated.li>
  )
}

function RisingTrailList(props) {
  const items = props.children

  const trail = useTrail(items.length, {
    to: {
      opacity: 1,
      transform: "translateY(0)"
    },
    from: {
      opacity: 0,
      transform: "translateY(8vh)"
    }
  })

  return (
    <animated.ul className="hex-grid__list" {...props}>
      {trail.map((style, idx) => (
        <HexTile style={style} onClick={props.onClick} key={`hex-${idx}`} child={items[idx]} />
      ))}
    </animated.ul>
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

  return (
    <div ref={containerEle} style={{ ...props.style, maxWidth: "1600px", minWidth: "300px" }} className={`hex-grid hex-grid__col-${colSize}`}>
      <RisingTrailList children={props.children} />

      {/* <ul className="hex-grid__list" style={{ padding: padding }}>
        {children.map((child, idx) => (<HexTile onClick={props.onClick} key={`hex-${idx}`} child={child} />))}
      </ul> */}
    </div >
  )
}

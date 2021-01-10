import React, { useState, useEffect, useRef } from 'react'
import { animated, useTrail } from 'react-spring'

import './HexGrid.scss'

import { LightenDarkenColor, getTextColor } from '../../utils/color'

import Button from '../Button'


// function HexTileCard(props) {

//   let backgroundColor = LightenDarkenColor(props.backgroundColor, 125)
//   let cardTextColor = getTextColor(backgroundColor)

//   return (
//     <div className="hex-grid__details">
//       <div className="hex-grid__details-crop">
//         <div className="hex-grid__details-card" style={{ color: cardTextColor, backgroundColor: backgroundColor }}>

//         </div>
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
        style={{ backgroundColor: child.props.cardColor || props.defaultHexColor || "white" }}
        onMouseEnter={showCard}
      >
        <span className="hex-grid__details-title">
          {child.props.title}
        </span>
        {child}
        <Button size="small" color={child.props.buttonColor}>Visit</Button>
      </div>
      {/* <HexTileCard
        title={child.props.title}
        description={child.props.description}
        show={cardViz}
        buttonColor={child.props.buttonColor}
        backgroundColor={child.props.cardColor || props.defaultHexColor || "white"}
      /> */}
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
        <HexTile
          style={style}
          onClick={props.onClick}
          key={`hex-${idx}`}
          child={items[idx]}
        />
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
    </div >
  )
}

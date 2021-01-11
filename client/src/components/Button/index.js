import React from 'react'

import "./Button.css"

import { getTextColor } from '../../utils/color'

export default function Button(props) {
  let className = "button"
  let style = {}

  className += props.variant ? " " + props.variant : " default"

  if (props.color && props.color.startsWith("#")) {
    style["backgroundColor"] = props.color
    style["color"] = getTextColor(props.color)
    console.log(style)
  } else {
    className += props.color ? " " + props.color : ""
  }

  className += props.disabled ? " disabled" : ""

  return (
    <span
      onClick={props.disabled ? null : props.onClick}
      className={className + (props.className ? " " + props.className : "")}
      style={style}
    >
      {props.children}
    </span>
  )
}

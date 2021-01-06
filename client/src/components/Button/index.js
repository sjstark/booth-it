import React from 'react'

import "./Button.css"

export default function Button(props) {
  let className = "button"

  className += props.variant ? " " + props.variant : " default"

  className += props.color ? " " + props.color : ""

  className += props.disabled ? " disabled" : ""

  return (
    <span
      onClick={props.disabled ? null : props.onClick}
      className={className + (props.className ? " " + props.className : "")}
    >
      {props.children}
    </span>
  )
}

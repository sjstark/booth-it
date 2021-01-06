import React from 'react'

export default function Button(props) {
  let className = props.variant ? props.variant : "default"

  className += props.color ? " " + props.color : ""



  return (
    <div onClick={props.onClick}>
      {props.children}
    </div>
  )
}

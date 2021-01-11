import React, { useState } from 'react'

import './FormBoolean.scss'

export default function FormBoolean({ name, value, onChange }) {

  const handleClick = (e) => {
    e.stopPropagation()
    onChange(prevState => !prevState)
  }

  return (
    <div className="form-boolean__container">
      <div className="form-boolean__name">{name}</div>
      <div
        className={`form-boolean__checkbox ${value ? "form-boolean__checkbox--checked" : ""}`}
        onClick={handleClick}
      >
        {value && (<i className="fas fa-check" />)}
      </div>
    </div>
  )
}

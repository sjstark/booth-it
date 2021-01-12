import React, { useState } from 'react'

import './FormFile.css'

export default function FormInput({ name, value, onChange, required, error }) {

  return (
    <div className={`form-file__container ${error && ' form-file__container--error'}`}>
      <div className="form-file__name">{name}:</div>
      <input
        onClick={(e) => e.stopPropagation()}
        className="form-file__input"
        type="file"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

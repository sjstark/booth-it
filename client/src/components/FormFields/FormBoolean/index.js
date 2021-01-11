import React, { useState } from 'react'

import './FormBoolean.css'

export default function FormBoolean({ name, value, onChange }) {

  return (
    <div >
      <div className="form-boolean__name">{name}</div>
      <input
        className="form-boolean__checkbox"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
    </div>
  )
}

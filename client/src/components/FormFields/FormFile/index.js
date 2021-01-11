import React, { useState } from 'react'

import './FormFile.css'

export default function FormInput({ name, value, onChange, required, error }) {
  const [focused, setFocused] = useState(false)


  const focusChildInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.querySelector('input').focus()
  }

  const focusSiblingInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.parentElement.querySelector('input').focus()
  }

  const shiftName = (e) => {
    e.stopPropagation()
    if (focused) return;
    setFocused(true)
    const wrapper = e.target.parentElement
    wrapper.classList.add('form-input__container--focused')
    wrapper.classList.add('form-input__container--filled')
  }

  const blurContainer = (e) => {
    setFocused(false)
    const wrapper = e.target.parentElement
    wrapper.classList.remove('form-input__container--focused')
    if (!e.target.value) wrapper.classList.remove('form-input__container--filled')
  }

  return (
    <div className={`form-file__container ${error && ' form-file__container--error'}`}>
      <div className="form-file__name">{name}</div>
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

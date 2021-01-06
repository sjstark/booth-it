import React, { useState } from 'react'

import './FormInputField.css'

export default function FormInputField({ name, value, onChange, required, rows, cols, maxLength }) {
  const [focused, setFocused] = useState(false)

  const focusChildInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.querySelector('textarea').focus()
  }

  const focusSiblingInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.parentElement.querySelector('textarea').focus()
  }

  const shiftName = (e) => {
    e.stopPropagation()
    if (focused) return;
    setFocused(true)
    const wrapper = e.target.parentElement
    wrapper.classList.add('form-input-field__container--focused')
    wrapper.classList.add('form-input-field__container--filled')
  }

  const blurContainer = (e) => {
    setFocused(false)
    const wrapper = e.target.parentElement
    wrapper.classList.remove('form-input-field__container--focused')
    if (!e.target.value) wrapper.classList.remove('form-input-field__container--filled')
  }

  return (
    <div onClick={focusChildInput} className={`form-input-field__container${value && ' form-input-field__container--filled'}`}>
      <div onClick={focusSiblingInput} className="form-input-field__name">{name}</div>
      <textarea
        onClick={(e) => e.stopPropagation()}
        onFocus={shiftName}
        onBlur={blurContainer}
        className="form-input-field__input"
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        rows={rows}
        cols={cols}
      />
    </div>
  )
}

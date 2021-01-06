import React, { useState } from 'react'

import './FormInput.css'

export default function FormInput({ name, type, value, onChange, required, maxLength, min, step }) {
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
    <div onClick={focusChildInput} className={`form-input__container${value && ' form-input__container--filled'}`}>
      <div onClick={focusSiblingInput} className="form-input__name">{name}</div>
      <input
        onClick={(e) => e.stopPropagation()}
        onFocus={shiftName}
        onBlur={blurContainer}
        className="form-input__input"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        min={min}
        step={step}
      />
    </div>
  )
}

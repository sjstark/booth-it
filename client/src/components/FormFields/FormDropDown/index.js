import React, { useState } from 'react'

import './FormDropDown.css'

export default function FormInputField({ name, value, onChange, required, options }) {
  const [focused, setFocused] = useState(false)

  const focusChildInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let event = document.createEvent('MouseEvents')

    event.initMouseEvent('mousedown',true,true,window);

    e.target.parentElement.querySelector('select').focus()
    e.target.parentElement.querySelector('select').dispatchEvent(event)
  }

  const focusSiblingInput = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let event = document.createEvent('MouseEvents')

    event.initMouseEvent('mousedown',true,true,window);

    e.target.parentElement.querySelector('select').focus()
    e.target.parentElement.querySelector('select').dispatchEvent(event)

  }

  const shiftName = (e) => {
    e.stopPropagation()
    if (focused) return;
    setFocused(true)
    const wrapper = e.target.parentElement
    wrapper.classList.add('form-select__container--focused')
    wrapper.classList.add('form-select__container--filled')
  }

  const blurContainer = (e) => {
    setFocused(false)
    const wrapper = e.target.parentElement
    wrapper.classList.remove('form-select__container--focused')
    if (!e.target.value) wrapper.classList.remove('form-select__container--filled')
  }

  return (
    <div onClick={focusChildInput} className={`form-select__container${value && ' form-select__container--filled'}`}>
      <div className="form-select__name">{name}</div>
      <select
        onClick={(e) => e.stopPropagation()}
        onFocus={shiftName}
        onBlur={blurContainer}
        className="form-select__input"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value=""></option>
        {options && options.map( (option, idx) => {
          return <option key={idx} value={option.id}>{option.title}</option>
        })}
      </select>
    </div>
  )
}

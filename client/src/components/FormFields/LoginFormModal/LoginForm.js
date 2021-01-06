import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'

import FormInput from '../FormInput'

import './LoginForm.css'

export default function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
        }
      })
  }

  return (
    <form className='login-form'>
      <h2>Login to <span style={{ fontFamily: "'Pacifico', cursive" }}>'SupDog</span></h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      )}
      <div className="login-form__input-fields">
        <FormInput name='Email or Username' required={true} type="text" value={credential} onChange={({ target }) => setCredential(target.value)} />
        <FormInput name='Password' required={true} type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div className="button button--primary" onClick={handleSubmit}>Log In</div>
    </form>
  )
}

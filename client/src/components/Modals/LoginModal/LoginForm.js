import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'

import './LoginForm.css'

const LoginForm = () => {
  const dispatch = useDispatch()


  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
        }
      })
  }

  console.log(errors)

  return (
    <form className="login-form">
      <h2>Login to <span style={{ fontFamily: "'Bungee', sans-serif" }}>Booth It</span></h2>
      <div className="login-form__errors">
        {errors.length > 0 && (
          "Invalid login credentials. Please try again"
        )}
      </div>
      <div className="login-form__input-fields">
        <FormInput
          name='Email'
          required={true}
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <FormInput
          name='Password'
          required={true}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button disabled={!email || !password} color="primary" onClick={handleSubmit}>Login</Button>
    </form >
  );
};

export default LoginForm;

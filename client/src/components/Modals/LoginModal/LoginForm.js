import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { animated, config, useTransition } from 'react-spring'

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
      .then((res) => {
        console.log({ res })
        if (res && res.errors) {
          setErrors(res.errors)
        }
        else if (res) {
          console.log("CLOSE")
        }
      })
  }

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
          error={Boolean(errors.length)}
          onChange={({ target }) => setEmail(target.value)}
        />
        <FormInput
          name='Password'
          required={true}
          type="password"
          value={password}
          error={Boolean(errors.length)}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button disabled={!email || !password} color="primary" onClick={handleSubmit}>Login</Button>
    </form >
  );
};

export default LoginForm;

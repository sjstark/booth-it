import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import { animated, config, useTransition } from 'react-spring'

import * as sessionActions from '../../../store/session'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'

import './SignupForm.css'

const SignupForm = ({ openLogin, closeSignup }) => {
  const dispatch = useDispatch()


  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signup({ email, password }))
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

  const switchToSignup = (e) => {
    e.preventDefault()
    closeSignup()
    openLogin()
  }

  return (
    <form className="signup-form">
      <h2>Signup for <span style={{ fontFamily: "'Bungee', sans-serif" }}>Booth It</span></h2>

      <div className="signup-form__errors">
        {errors.length > 0 && (
          "Invalid signup credentials. Please try again"
        )}
      </div>

      <div className="signup-form__input-fields">
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
      <Button disabled={!email || !password} color="primary" onClick={handleSubmit}>Signup</Button>
      <span onClick={switchToSignup}>Already have an account?</span>
    </form >
  );
};

const mapStateToProps = state => ({ openLogin: state.modals.login.handleOpen, closeSignup: state.modals.signup.handleClose })

export default connect(mapStateToProps)(SignupForm);

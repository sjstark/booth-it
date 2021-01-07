import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import { animated, config, useTransition } from 'react-spring'

import * as sessionActions from '../../../store/session'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'
import ImageInput from '../../FormFields/ImageCropper/ImageInput'

import './SignupForm.css'

const SignupForm = ({ openLogin, closeSignup }) => {
  const dispatch = useDispatch()


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  const [errors, setErrors] = useState({})
  const [ready, setReady] = useState(false)

  let hasError = false

  const params = [
    firstName,
    lastName,
    email,
    company,
    jobTitle,
    password,
    confirmPassword
  ]

  useEffect(() => {
    setReady(params.every(x => Boolean(x)))

  }, params)

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    let newErrors = {}

    hasError = false

    if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      newErrors["email"] = ('Please enter a valid email address!')
      hasError = true
    }
    if (confirmPassword !== password) {
      newErrors["password"] = ('Please make sure passwords match!')
      hasError = true

    }
    if (hasError) {
      setErrors(newErrors)
      console.log(newErrors)
      return
    }

    const user = { email, firstName, lastName, company, jobTitle, profilePic, password }
    return dispatch(sessionActions.signup(user))
      .then((res) => {
        console.log('then:')
        console.log({ res })
        if (res.errors) throw res
        closeSignup()
        return res
      })
      .catch((res) => {
        if (res && res.errors) {
          console.log(res.errors)
          setErrors(res.errors)
        }
      })
  }



  const switchToSignup = (e) => {
    e.preventDefault()
    openLogin()
    closeSignup()
  }

  return (
    <form className="signup-form">
      <h2>Signup for <span style={{ fontFamily: "'Bungee', sans-serif" }}>Booth It</span></h2>

      <div className="signup-form__errors">
        <span >
          {Object.values(errors).map(msg => msg + " ")}
        </span>

      </div>
      <div className="signup-form__inputs-container">
        <div className="signup-form__input-fields">
          <FormInput
            name='First Name'
            required={true}
            type="text"
            value={firstName}
            error={false}
            onChange={({ target }) => setFirstName(target.value)}
          />
          <FormInput
            name='Last Name'
            required={true}
            type="text"
            value={lastName}
            error={false}
            onChange={({ target }) => setLastName(target.value)}
          />
          <FormInput
            name='Company'
            required={true}
            type="text"
            value={company}
            error={false}
            onChange={({ target }) => setCompany(target.value)}
          />
          <FormInput
            name='Job Title'
            required={true}
            type="text"
            value={jobTitle}
            error={false}
            onChange={({ target }) => setJobTitle(target.value)}
          />
          <FormInput
            name='Email'
            required={true}
            type="text"
            value={email}
            error={"email" in errors}
            onChange={({ target }) => setEmail(target.value)}
          />
          <FormInput
            name='Password'
            required={true}
            type="password"
            value={password}
            error={"password" in errors}
            onChange={({ target }) => setPassword(target.value)}
          />
          <FormInput
            name='Confirm Password'
            required={true}
            type="password"
            value={confirmPassword}
            error={"password" in errors}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <div className="signup-form__profile-pic">
          <h2>Select a Profile Picture</h2>
          <span>After selecting an image, drag to position and scroll to zoom.</span>
          <ImageInput aspect={1} onChange={setProfilePic} />
        </div>
      </div>
      <Button disabled={!ready} color="primary" onClick={handleSubmit}>Signup</Button>
      <span onClick={switchToSignup}>Already have an account?</span>
    </form >
  );
};

const mapStateToProps = state => ({ openLogin: state.modals.login.handleOpen, closeSignup: state.modals.signup.handleClose })

export default connect(mapStateToProps)(SignupForm);

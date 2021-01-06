import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import compress from 'compress.js'

import * as sessionActions from '../../store/session'
import { Redirect, useHistory } from 'react-router-dom'
import FormInput from '../FormInput'
import ImageInput from '../ImageCropper/ImageInput'

import './SignupForm.css'


// Start of profile pic resizing function
const resizeProfilePic = async (file) => {
  const resizedImage = await compress.compress([file], {
    size: 2, //Max file size set to 2Mb
    quality: 1, //Sets quality of image (max of 1),
    maxWidth: 300, //Sets the max width of the image to 300px
    maxHeight: 300, //Sets the max height of the image
    resize: true //confirm that we want to resize the picture
  })

  const img = resizedImage[0]; //compress.compress returns an array
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFile = compress.convertBase64ToFile(base64str, imgExt)
  return resizedFile
}

export default function SignupForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePic, setProfilePic] = useState(null)
  // const [profilePicPreview, setProfilePicPreview] = useState(null)
  const [errors, setErrors] = useState([])
  const [sending, setSending] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) return (<Redirect to='/' />)

  const handleSubmit = (e) => {
    e.preventDefault();


    setErrors([]);

    let newErrors = [];

    if (confirmPassword !== password) {
      newErrors.push('Please make sure passwords match!')
      return setErrors(newErrors)
    }

    setSending(true)

    const user = { email, username, firstName, lastName, profilePic, password }

    return dispatch(sessionActions.signup(user))
      .then((res) => {
        if (res.statusText !== 'OK') throw res
        return res
      })
      .catch((res) => {
        if (res.data && res.data.errors) {
          setErrors(res.data.errors)
          setSending(false)
        }
      })

  }

  return (
    <form className='signup-form'>
      <h2>Sign Up for <span style={{ fontFamily: "'Pacifico', cursive" }}>'SupDog</span></h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      )}
      <div className="signup-form__inputs-container">
        <div className="signup-form__input-fields">
          <FormInput name='First Name' required={true} type="text" value={firstName} onChange={({ target }) => setFirstName(target.value)} />
          <FormInput name='Last Name' required={true} type="text" value={lastName} onChange={({ target }) => setLastName(target.value)} />
          <FormInput name='Email' required={true} type="text" value={email} onChange={({ target }) => setEmail(target.value)} />
          <FormInput name='Username' required={true} type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          <FormInput name='Password' required={true} type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          <FormInput name='Confirm Password' required={true} type="password" value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} />
        </div>
        <div className="signup-form__profile-pic">
          <h2>Select a Profile Picture</h2>
          <span>After selection image, drag to position and scroll to zoom.</span>
          <ImageInput aspect={1} onChange={setProfilePic} />
        </div>
      </div>
      {<div className="button button--primary" onClick={handleSubmit}>Sign Up</div>}
    </form>
  )
}

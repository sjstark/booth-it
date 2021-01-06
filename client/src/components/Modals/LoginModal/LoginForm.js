import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session'

import Button from '../../Button'
import FormInput from '../../FormFields/FormInput'

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

  return (
    <form>
      <h2>Login to <span style={{ fontFamily: "'Pacifico', cursive" }}>'SupDog</span></h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      )}
      <div className="login-form__input-fields">
        <FormInput
          name='Email or Username'
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
      <Button onClick={handleSubmit}>Login</Button>
    </form >
  );
};

export default LoginForm;

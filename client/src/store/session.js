import axios from 'axios'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

const endSession = () => ({
  type: REMOVE_USER
})

export const login = ({ email, password }) => {
  return async dispatch => {

    const method = 'POST'
    const body = {
      email: email,
      password: password
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    const res = await fetch('/api/auth/login/', { method, body: JSON.stringify(body), headers })
    const resJSON = await res.json()

    if (!resJSON.errors) {
      dispatch(setUser(resJSON))
    }

    return resJSON
  }
}

export const restoreUser = () => {
  return async dispatch => {
    const res = await fetch('/api/auth/')
    const user = await res.json()
    if (!user.errors) {
      dispatch(setUser(user))
    }
    else {
      dispatch(endSession())
    }

    return user
  }
}

export const signup = (user) => {
  return async dispatch => {
    const { profilePic, firstName, lastName, company, jobTitle, password, email } = user;
    const formData = new FormData();
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('company', company)
    formData.append('jobTitle', jobTitle)
    formData.append('password', password)
    formData.append('email', email)
    if (profilePic) {
      formData.append('profilePic', profilePic)
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    const res = await axios.post('/api/auth/signup/', formData, config)
    const resJSON = res.data

    if (!resJSON.errors) {
      dispatch(setUser(resJSON))
    }

    return resJSON

  }
}


export const logout = () => {
  return async dispatch => {
    const res = await fetch('/api/auth/logout/')

    dispatch(endSession())
  }
}


let initialState = null // null for Unauthenticated, User object for authenticated

function sessionReducer(state = initialState, action) {
  let newUserState;
  switch (action.type) {

    case SET_USER:
      newUserState = Object.assign({}, state)
      newUserState = action.payload
      return newUserState

    case REMOVE_USER:
      newUserState = Object.assign({}, state)
      newUserState = null
      return newUserState

    default:
      return state
  }
}

export default sessionReducer

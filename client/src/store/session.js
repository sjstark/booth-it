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

export const login = (user) => {
  return async dispatch => {
    const { credential, password } = user;

    const method = 'POST'
    const body = {
      credential,
      password
    }

    const res = await fetch('/api/auth/login/', { method, body: JSON.stringify(body) })
    const user = await res.json()

    dispatch(setUser(user))

    return res
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
    const { profilePic, firstName, lastName, username, password, email } = user;
    const formData = new FormData();
    // formData.append('firstName', firstName)
    // formData.append('lastName', lastName)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('email', email)
    // if (profilePic) {
    //   formData.append('profilePic', profilePic)
    // }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    return axios.post('/api/users/', formData, config)
      .then(res => {
        return res.json()
      })
      .then(body => {
        return dispatch(setUser(user))
      })
      .catch((err) => {
        return err.response
      })
  }
}


export const logout = () => {
  return async dispatch => {
    const res = await fetch('/api/session', {
      method: 'DELETE'
    })

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

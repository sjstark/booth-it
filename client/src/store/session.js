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

    dispatch(setUser(res.data.user))

    return res
  }
}

export const restoreUser = () => {
  return async dispatch => {
    const res = await fetch('/api/auth/')

    dispatch(setUser(res))

    return res
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
        const user = res.data;
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


let initialState = { user: null }

function sessionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case SET_USER:
      newState = Object.assign({}, state)
      newState.user = action.payload
      return newState

    case REMOVE_USER:
      newState = Object.assign({}, state)
      newState.user = null
      return newState

    default:
      return state
  }
}

export default sessionReducer

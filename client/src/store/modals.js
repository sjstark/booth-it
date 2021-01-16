const SET_LOGIN_MODAL = 'modals/setLoginModal'
const SET_SIGNUP_MODAL = 'modals/setSignupModal'

const _setLoginModal = (open, setOpen) => ({
  type: SET_LOGIN_MODAL,
  payload: {
    open,
    handleOpen: () => { setOpen(true) },
    handleClose: () => { setOpen(false) }
  }
})

const _removeLoginModal = () => ({
  type: SET_LOGIN_MODAL,
  payload: {}
})

const _setSignupModal = (open, setOpen) => ({
  type: SET_SIGNUP_MODAL,
  payload: {
    open,
    handleOpen: () => { setOpen(true) },
    handleClose: () => { setOpen(false) }
  }
})

const _removeSignupModal = () => ({
  type: SET_SIGNUP_MODAL,
  payload: {}
})


export const setLoginModal = (open, setOpen) => {
  return dispatch => {
    return dispatch(_setLoginModal(open, setOpen))
  }
}

export const removeLoginModal = () => {
  return dispatch => {
    return dispatch(_removeLoginModal())
  }
}

export const setSignupModal = (open, setOpen) => {
  return dispatch => {
    return dispatch(_setSignupModal(open, setOpen))
  }
}

export const removeSignupModal = () => {
  return dispatch => {
    return dispatch(_removeSignupModal())
  }
}

let initialState = {
  login: {},
  signup: {}
}

function modalsReducer(state = initialState, action) {
  let newState;
  console.log({ action })

  switch (action.type) {
    case SET_LOGIN_MODAL:
      newState = { ...state, login: action.payload }
      return newState
    case SET_SIGNUP_MODAL:
      newState = { ...state, signup: action.payload }
      return newState
    default:
      return state
  }
}

export default modalsReducer

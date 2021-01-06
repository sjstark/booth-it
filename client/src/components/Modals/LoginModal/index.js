import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';

import * as modalsActions from '../../../store/modals'


import { Dialog } from '@material-ui/core'

import LoginForm from './LoginForm'

function LoginModal({ handleClose }) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  // modalsActions.setLoginModal(open, setOpen)

  useEffect(() => {
    (async () => {
      console.log('hit here!')
      let res = await dispatch(modalsActions.setLoginModal(open, setOpen))
      console.log({ res })
    })()
    return async () => {
      await dispatch(modalsActions.removeLoginModal())
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <LoginForm />
    </Dialog>
  )
}

const mapStateToProps = state => ({ handleClose: state.modals.login.handleClose })

export default connect(mapStateToProps)(LoginModal)

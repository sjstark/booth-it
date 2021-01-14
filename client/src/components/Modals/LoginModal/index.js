import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';

import * as modalsActions from '../../../store/modals'


import { Dialog, DialogContent } from '@material-ui/core'

import LoginForm from './LoginForm'

function LoginModal({ handleClose }) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(modalsActions.setLoginModal(open, setOpen))
    })()
    return async () => {
      await dispatch(modalsActions.removeLoginModal())
    }
  }, [dispatch, open])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = state => ({ handleClose: state.modals.login.handleClose })

export default connect(mapStateToProps)(LoginModal)

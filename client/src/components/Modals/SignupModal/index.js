import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';

import * as modalsActions from '../../../store/modals'


import { Dialog, DialogContent } from '@material-ui/core'

import SignupForm from './SignupForm'

function SignupModal({ handleClose }) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      let res = await dispatch(modalsActions.setSignupModal(open, setOpen))
    })()
    return async () => {
      await dispatch(modalsActions.removeSignupModal())
    }
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"md"}

    >
      <DialogContent>
        <SignupForm />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = state => ({ handleClose: state.modals.signup.handleClose })

export default connect(mapStateToProps)(SignupModal)

import React from 'react'

import { Dialog, DialogContent } from '@material-ui/core'

import Button from '../../Button'

import './InviteModal.scss'

export default function InviteModal({ open, onClose, show, booth }) {

  const handleDelete = (e) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth={"md"}

    >
      <DialogContent>
        <div className="invite-modal">

        </div>
      </DialogContent>
    </Dialog>
  )
}

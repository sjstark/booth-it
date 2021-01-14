import React from 'react'

import { Dialog, DialogContent } from '@material-ui/core'

import Button from '../../Button'

import './DeleteModal.scss'

export default function DeleteModal({ open, onClose, deleteFn, message }) {

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteFn()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth={"md"}

    >
      <DialogContent>
        <div className="delete-modal">
          <p className="delete-modal__body">
            {message.split('\n').map(str => (<p>{str}</p>))}
          </p>
          <div className="delete-modal__buttons">
            <Button
              onClick={onClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="warning"
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import React from 'react'

import axios from 'axios'

import { Dialog, DialogContent } from '@material-ui/core'

import Button from '../../Button'

import './InviteModal.scss'

function InviteLink({ show, booth }) {

}

export default function InviteModal({ open, onClose, show, booth }) {

  const showCreateLink = async (e) => {
    e.stopPropagation()
    console.log('creating!')

    let inviteLink = ''
    if (!booth) {
      // Post to '/api/shows/SID/invites'
      // This will create a new booth (this is an invite for a new company)
      const res = await axios.post(`/api/shows/${show.SID}/invites/`)
      inviteLink = res.data
    } else {
      // Post to '/api/shows/SID/booths/BID/invites
      const res = await axios.post(`/api/shows/${show.SID}/booths/${booth.BID}/invites/`)
      inviteLink = res.data
      return
    }

  }

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth={"md"}
    >
      <DialogContent>
        <div className="invite-modal">
          <h1 className="invite-modal__title">

          </h1>
          <div className="invite-modal__existing">

          </div>
          <div className="invite-modal__create">
            <Button
              onClick={showCreateLink}
              color="primary"
            >
              Create New Link
            </Button>
          </div>
          <Button
            onClick={onClose}
            color="warning"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

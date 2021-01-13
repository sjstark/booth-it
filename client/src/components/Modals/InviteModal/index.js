import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios'

import { Dialog, DialogContent } from '@material-ui/core'

import Button from '../../Button'

import './InviteModal.scss'

import { animated, useSpring } from 'react-spring'
import { useLocation } from 'react-router-dom'


function InviteList({ show }) {
  const [inviteLinks, setInviteLinks] = useState([])

  useEffect(() => {


    (async () => {
      let urlArr = window.location.href.split('/')

      let baseURL = urlArr.slice(0, 3).join('/')
      const res = await fetch(`/api/shows/${show.SID}/invites/`)
      const resJSON = await res.json()
      setInviteLinks(resJSON.map(append => baseURL + append))
    })()
  }, [show])

  return (
    <>
      {inviteLinks.map(inviteLink => <InviteLink link={inviteLink} />)}
    </>
  )
}


function InviteLink({ link }) {
  const copyTextRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const copyLink = (e) => {
    e.stopPropagation()
    copyTextRef.current.select()
    document.execCommand('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 1250)
  }

  const [fadeOut, set] = useSpring(() => ({ opacity: 0 }))

  set({ opacity: copied ? 1 : 0 })

  return (
    <div className="invite-link">
      <div className="invite-link__text-container">
        <animated.div style={fadeOut}>
          <div className="invite-link__copied">
            Link Copied!
            </div>
        </animated.div>
        <input readOnly ref={copyTextRef} value={link}></input>
      </div>
      <div className="invite-link__copy-container" onClick={copyLink} title="Copy Link">
        <i className="far fa-copy"></i>
      </div>
    </div>
  )
}

export default function InviteModal({ open, onClose, show, booth }) {
  const [newInvite, setNewInvite] = useState(null)

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
    }

    let urlArr = window.location.href.split('/')

    let baseURL = urlArr.slice(0, 3).join('/')

    inviteLink = baseURL + inviteLink

    setNewInvite(inviteLink)
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
            Copy the link and send to show partners to invite them to participate!
          </h1>
          <div className="invite-modal__existing">
            <InviteList show={show} />
          </div>
          <div className="invite-modal__create">
            {
              newInvite
              && (
                <InviteLink link={newInvite} />
              )
            }
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

import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios'

import { Dialog, DialogContent } from '@material-ui/core'

import Button from '../../Button'

import './InviteModal.scss'

import { animated, useSpring } from 'react-spring'
import Loader from '../../Loader'


function InviteList({ show, newInvite }) {
  const [inviteLinks, setInviteLinks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const reload = async () => {
    let urlArr = window.location.href.split('/')

    let baseURL = urlArr.slice(0, 3).join('/')
    const res = await fetch(`/api/shows/${show.SID}/invites/`)
    const resJSON = await res.json()
    setInviteLinks(resJSON.map(append => baseURL + append))
    setTimeout(() => setIsLoaded(true), 500)
  }

  useEffect(() => {
    reload()
  }, [show, newInvite])



  return (
    <>
      <div className="invite-link__existing-container">
        {
          isLoaded
            ?
            inviteLinks.length
              ?
              inviteLinks.map(inviteLink => <InviteLink key={inviteLink} link={inviteLink} reload={reload} />)
              :
              <span style={{ display: 'flex', justifyContent: 'center' }}>No pending invite links...</span>
            :
            <Loader duration={2500} style={{ width: `${100 * 0.86602543}px`, height: `${100}px`, margin: "200px auto" }} />
        }
      </div>
    </>
  )
}


function InviteLink({ link, reload }) {
  const copyTextRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const copyLink = (e) => {
    e.stopPropagation()
    copyTextRef.current.select()
    document.execCommand('copy')
    setCopied(true)
    setTimeout(() => setCopied(false), 1250)
  }

  const deleteLink = async (e) => {
    e.stopPropagation()
    let IID = link.slice(link.indexOf('IID=') + 4, link.indexOf('&S'))
    const res = await axios.delete(`/api/invites/${IID}`)
    if (res.data.success) {
      reload()
    }
  }

  const [fadeOut, set] = useSpring(() => ({ opacity: 0 }))

  set({ opacity: copied ? 1 : 0 })

  return (
    <div className="invite-link">
      <div className="invite-link__delete-container" onClick={deleteLink} title="Delete Invite">
        <i className="far fa-trash-alt"></i>
      </div>
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
  const [newInvite, setNewInvite] = useState(false)

  const showCreateLink = async (e) => {
    e.stopPropagation()
    if (!booth) {
      // Post to '/api/shows/SID/invites'
      // This will create a new booth (this is an invite for a new company)
      await axios.post(`/api/shows/${show.SID}/invites/`)
    } else {
      // Post to '/api/shows/SID/booths/BID/invites
      await axios.post(`/api/shows/${show.SID}/booths/${booth.BID}/invites/`)
    }

    setNewInvite(prev => !prev)
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
          <div className="invite-modal__existing" >
            <InviteList show={show} newInvite={newInvite} setNewInvite={setNewInvite} />
          </div>
          <div className="invite-modal__create">
            <Button
              onClick={showCreateLink}
              color="primary"
            >
              Create New Link
            </Button>
            <Button
              onClick={onClose}
              color="warning"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

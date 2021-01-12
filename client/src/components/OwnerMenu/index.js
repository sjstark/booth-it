import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import './OwnerMenu.scss'


export default function OwnerMenu({ show, booth }) {
  const history = useHistory()

  const [type, setType] = useState(booth ? "Booth" : "Show")


  const edit = (e) => {
    e.stopPropagation()
    if (type == "Booth") {
      history.push(`/shows/${booth.SID}/booths/${booth.BID}/edit`)
    }
    else if (type == "Show") {
      history.push(`/shows/${show.SID}/edit`)
    }
  }

  const invitePartner = (e) => {
    e.stopPropagation()
    console.log('invite')
  }

  return (
    <div className="owner-menu">
      <div
        title={`Edit ${type} Details`}
        onClick={edit}
        className="owner-menu__icon"
      >
        <i className="fas fa-pencil-alt"></i>
      </div>
      <div
        title="Invite Another Partner"
        onClick={invitePartner}
        className="owner-menu__icon"
      >
        <i className="fas fa-plus"></i>
      </div>
    </div>
  )
}

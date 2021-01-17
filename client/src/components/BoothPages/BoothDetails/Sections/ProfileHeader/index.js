import React, { useState, useRef } from 'react'

import axios from 'axios'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'


import { getTextColor } from '../../../../../utils/color'

import './ProfileHeader.scss'

export default function ProfileHeader({ booth, editable }) {
  const [editting, setEditting] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(booth.secondaryColor)
  const [headerColor, setHeaderColor] = useState(booth.primaryColor)

  const title = useRef(booth.company)
  const description = useRef(booth.description)

  const edit = (e) => {
    setEditting(true)
  }

  const submitEdit = async (e) => {
    setEditting(false)
    let edits = {
      title: title.current,
      description: description.current
    }

    const res = await axios.patch(`/api/shows/${booth.SID}/booths/${booth.BID}/`, { edits })
    const resJSON = await res.data
    console.log(resJSON)
  }

  const handleTitle = (e) => {
    let value = e.target.value
    if (value.length >= 4 && value.length <= 150) {
      title.current = value
    }
  }

  const handleDescription = (e) => {
    let value = e.target.value
    if (value.length >= 10 && value.length <= 500) {
      description.current = value
    }
  }

  return (
    <div className="section__header" style={{ backgroundColor }}>
      {editable &&
        (editting
          ?
          (
            <>
              <div
                title={`Confirm Edits`}
                onClick={submitEdit}
                className="section__edit"
              >
                <i className="fas fa-check" />
              </div>
            </>
          )
          :
          (<div
            title={`Edit Section`}
            onClick={edit}
            className="section__edit"
          >
            <i className="fas fa-pencil-alt" />
          </div>)
        )
      }
      { booth.boothLogoURL &&
        <section className="section__header-left">
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            src={booth.boothLogoURL}
            alt={booth.company}
          />
        </section>
      }
      <section className="section__header-right">
        <ContentEditable
          className="section__header-title"
          style={{ color: headerColor }}
          disabled={!editting}
          html={title.current}
          onChange={handleTitle}
        />
        <ContentEditable
          className="section__header-body"
          style={{ color: getTextColor(backgroundColor) }}
          disabled={!editting}
          html={description.current}
          onChange={handleDescription}
        />
      </section>
    </div>
  )
}

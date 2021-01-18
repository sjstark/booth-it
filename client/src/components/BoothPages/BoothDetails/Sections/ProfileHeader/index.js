import React, { useState, useRef, useEffect } from 'react'

import axios from 'axios'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

import ColorPickerBox from "../../../../Color/ColorPicker";
import { getTextColor } from '../../../../../utils/color'

import './ProfileHeader.scss'

export default function ProfileHeader({ booth, editable, setEditting: parentSetEditting }) {
  const [editting, setEditting] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(booth.secondaryColor)
  const [headerColor, setHeaderColor] = useState(booth.primaryColor)

  const [primaryColor, setPrimaryColor] = useState({ hex: booth.primaryColor })
  const [secondaryColor, setSecondaryColor] = useState({ hex: booth.secondaryColor })

  const [boothLogo, setBoothLogo] = useState(null)

  useEffect(() => {
    setHeaderColor(primaryColor.hex)
    setBackgroundColor(secondaryColor.hex)
  }, [primaryColor, secondaryColor])

  const title = useRef(booth.company)
  const description = useRef(booth.description)
  const fileInput = useRef(null)

  const edit = (e) => {
    setEditting(true)
    parentSetEditting(true)
  }

  const submitEdit = async (e) => {

    let formData = new FormData()

    formData.append('title', title.current)
    formData.append('description', description.current)
    formData.append('primaryColor', headerColor)
    formData.append('secondaryColor', backgroundColor)


    if (boothLogo) {
      formData.append('boothLogo', boothLogo)
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }

    const res = await axios.patch(`/api/shows/${booth.SID}/booths/${booth.BID}/`, formData, config)
    const resJSON = await res.data

    setEditting(false)
    parentSetEditting(false)
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

  const fileChange = ({ target }) => {
    if (target.files && target.files.length > 0) {
      setBoothLogo(target.files[0])
    }
  }

  return (
    <div className="section section__header" style={{ backgroundColor }}>
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
              <div
                title={`Change Pic`}
                onClick={() => fileInput.current.click()}
                className="section__edit-picture"
              >
                <i className="fas fa-camera" />
              </div>
              <input
                ref={fileInput}
                type='file'
                style={{ display: 'none' }}
                onChange={fileChange}
                accept={"image/*"}
              />
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
      {booth.boothLogoURL &&
        <section className="section__header-left">
          <img
            onDragStart={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            src={boothLogo ? URL.createObjectURL(boothLogo) : booth.boothLogoURL}
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
      {
        editting && (
          <div className="section__color-tray">
            <label>Logo Color:</label>
            <ColorPickerBox
              color={primaryColor}
              onChangeComplete={(color) => { setPrimaryColor(color) }}
            />
            <label>Background Color:</label>
            <ColorPickerBox
              color={secondaryColor}
              onChangeComplete={(color) => { setSecondaryColor(color) }}
            />
          </div>
        )
      }
    </div>
  )
}

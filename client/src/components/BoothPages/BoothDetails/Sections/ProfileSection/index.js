import React, { useState, useEffect, useRef } from 'react'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

import Button from '../../../../Button'
import ColorPickerBox from "../../../../Color/ColorPicker";

import './ProfileSection.scss'

function SectionEditTools({ editable, editting, submitEdit, setEditting }) {
  const edit = (e) => {
    setEditting(true)
  }

  return (
    editable &&
    (editting
      ?
      (
        <>
          <div
            title={`Confirm Edits`}
            onClick={() => { setEditting(false); submitEdit() }}
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

  )
}

function ColorEditor({ editting, setFontColor, setBackgroundColor, backgroundColor, fontColor }) {
  const [backColorObj, setBackColorObj] = useState({ hex: backgroundColor })
  const [fontColorObj, setFontColorObj] = useState({ hex: fontColor })

  useEffect(() => {
    setFontColor(fontColorObj.hex)
    setBackgroundColor(backColorObj.hex)
  }, [backColorObj, fontColorObj])

  return editting && (
    <div className="section__color-tray">
      <label>Font Color:</label>
      <ColorPickerBox
        color={fontColor}
        onChangeComplete={(color) => { setFontColorObj(color) }}
      />
      <label>Background Color:</label>
      <ColorPickerBox
        color={backgroundColor}
        onChangeComplete={(color) => { setBackColorObj(color) }}
      />
    </div>
  )
}


function TextSection({ content, setContent, editable, editting, setEditting, submitEdit }) {
  const [headerText, setHeaderText] = useState(content.header ? content.header : 'Click here to edit the header')
  const [bodyText, setBodyText] = useState(content.body ? content.body : 'Click here to edit the body text!')

  useEffect(() => {
    setContent(prev => ({ ...prev, header: headerText, body: bodyText }))
  }, [headerText, bodyText])

  let sanitizeConf = {
    allowedTags: ["b", "i", "em", "p",],
    allowedAttributes: {
      '*': []
    },
    allowedStyles: {
      '*': {
        'color': [/^ $/g]
      }
    }
  };

  return (
    <>

      <ContentEditable
        className="section-text__header"
        disabled={!editting}
        html={headerText}
        onChange={({ target }) => setHeaderText(target.value)}

      />
      <ContentEditable
        className="section-text__body"
        disabled={!editting}
        html={bodyText}
        onChange={({ target }) => setBodyText(sanitizeHtml(target.value, sanitizeConf))}
      />
    </>
  )
}


export default function ProfileSection({ editable, section, saveSection }) {
  const [type, setType] = useState(section.type)
  const [editting, setEditting] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [fontColor, setFontColor] = useState("#000000")

  const [content, setContent] = useState({})


  const submitEdit = (content) => {
    saveSection({ type, content })
  }



  if (type === 'new') {
    return (
      <div>
        <div>
          Select section type:
        </div>
        <Button
          onClick={() => { setType('text'); setEditting(true) }}
        >
          Text Section
        </Button>
        {/* <Button
          onClick={() => console.log('video')}
        >
          Video Section
        </Button>
        <Button
          onClick={() => console.log('image')}
        >
          Image Section
        </Button> */}
      </div>
    )
  }

  let SectionBody

  if (type === "text") {
    SectionBody = (
      <TextSection
        editable={editable}
        editting={editting}
        setEditting={setEditting}
        submitEdit={submitEdit}
        content={content}
        setContent={setContent}
      />
    )
  }
  return (
    <div className="section section-text">
      <SectionEditTools
        editable={editable}
        editting={editting}
        setEditting={setEditting}
        submitEdit={submitEdit}
      />
      {SectionBody}
      <ColorEditor
        editting={editting}
        fontColor={fontColor}
        setFontColor={setFontColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
    </div>
  )
}

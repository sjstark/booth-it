import React, { useState, useEffect, useRef } from 'react'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

import Button from '../../../../Button'
import ColorPickerBox from "../../../../Color/ColorPicker";

import './ProfileSection.scss'

function SectionEditTools({ editable, editting, submitEdit, setEditting, deleteSection }) {
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
          <div
            title={`Delete Section`}
            onClick={() => { setEditting(false); deleteSection() }}
            className="section__edit section__edit-delete"
          >
            <i className="fas fa-trash" />
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
        color={fontColorObj}
        onChangeComplete={(color) => { setFontColorObj(color) }}
      />
      <label>Background Color:</label>
      <ColorPickerBox
        color={backColorObj}
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
        className="section-text__body"
        disabled={!editting}
        html={bodyText}
        onChange={({ target }) => setBodyText(sanitizeHtml(target.value, sanitizeConf))}
      />
    </>
  )
}


export default function ProfileSection({ editable, section, saveSection, deleteSection, checkTitle }) {
  const [type, setType] = useState(section.type)
  const [editting, setEditting] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(section.backgroundColor || "#ffffff")
  const [fontColor, setFontColor] = useState(section.fontColor || "#000000")

  const [title, setTitle] = useState(section.title || 'Click here to edit the title')
  const [originalTitle, setOriginalTitle] = useState(section.title || 'Click here to edit the title')
  const [content, setContent] = useState(section.content || {})


  const submitEdit = () => {
    if (title !== originalTitle && checkTitle(title)) {
      alert('You already have a section with that title!')
      setEditting(true)
    }
    else {
      saveSection({ type, title, content, fontColor, backgroundColor })
      setOriginalTitle(title)
    }
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
    <div className="section section-text" style={{ color: fontColor, backgroundColor: backgroundColor }}>
      <SectionEditTools
        editable={editable}
        editting={editting}
        setEditting={setEditting}
        submitEdit={submitEdit}
        deleteSection={deleteSection}
      />
      <ContentEditable
        className="section-text__header"
        disabled={!editting}
        html={title}
        onChange={({ target }) => setTitle(target.value)}
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

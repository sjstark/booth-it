import React, { useState, useEffect, useRef } from 'react'

import ReactPlayer from 'react-player'
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


function VideoSection({ content, setContent, editting }) {
  const [videoUrl, setVideoUrl] = useState(content.videoUrl || "")

  useEffect(() => {
    setContent(prev => ({ ...prev, videoUrl }))
  }, [videoUrl])


  return (
    <>
      { editting && (
        <div className="section-video__input">
          <div className="section-video__instructions">
            <p>
              {"Please paste in the link to your video or live stream."}
            </p>
            <p >
              {"Currently, we accept links from: YouTube, Facebook, SoundCloud, Streamable, Vimeo, Wistia, Twitch, DailyMotion, and Vidyard."}
            </p>
            <p >
              {"If your video is hosted elsewhere, we also accept urls to filetypes taht use <video> or <audio> elements."}
            </p>
          </div>
          <label className="section-video__input-label">
            Video URL:
          </label>
          <input
            className="section-video__input-field"
            type="text"
            placeholder="i.e. https://www.youtube.com/watch?v=ysz5S6PUM-U"
            value={videoUrl}
            onChange={({ target }) => setVideoUrl(target.value)}
          />
        </div>
      )}
      <ReactPlayer
        width="100%"
        url={videoUrl}
      />
    </>
  )
}


function TextSection({ content, setContent, editting }) {
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


export default function ProfileSection({
  editable,
  section,
  saveSection,
  deleteSection,
  checkTitle,
  setEditting: parentSetEditting
}) {
  const [type, setType] = useState(section.type)
  const [editting, setEditting] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(section.backgroundColor || "#ffffff")
  const [fontColor, setFontColor] = useState(section.fontColor || "#000000")

  const [title, setTitle] = useState(section.title || 'Click here to edit the title')
  const [originalTitle, setOriginalTitle] = useState(section.title || 'Click here to edit the title')
  const [content, setContent] = useState(section.content || {})

  useEffect(() => {
    parentSetEditting(editting)
  }, [editting])

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
        <Button
          onClick={() => { setType('video'); setEditting(true) }}
        >
          Video Section
        </Button>
        {/* <Button
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
  if (type === "video") {
    SectionBody = (
      <VideoSection
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
        deleteSection={() => { parentSetEditting(false); deleteSection() }}
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

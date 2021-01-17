import React, { useState, useEffect } from 'react'

import ContentEditable from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

export default function TextSection({ content, setContent, editting }) {
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

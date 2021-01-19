import React, { useState, useEffect } from 'react'

import ReactPlayer from 'react-player'

export default function VideoSection({ content, setContent, editting }) {
  const [videoUrl, setVideoUrl] = useState(content.videoUrl || "")

  const [isFacebook, setIsFacebook] = useState(false)

  useEffect(() => {
    if (videoUrl.search('facebook.com')) {
      setIsFacebook(true)
    }

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
              {"We apologize, but at the moment, portrait videos from Facebook will not display properly."}
            </p>
            <p >
              {"If your video is hosted elsewhere, we also accept urls to filetypes that use <video> or <audio> elements."}
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
      <div className="section-video__player-container">
        <ReactPlayer
          url={videoUrl}
        />
      </div>
    </>
  )
}

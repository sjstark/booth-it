import React, { useState, useEffect } from 'react'

import ReactPlayer from 'react-player'

export default function VideoSection({ content, setContent, editting }) {
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
